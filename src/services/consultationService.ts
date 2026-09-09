import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ConsultationBookingData, ConsultationRecord, ConsultationStatus } from '../types';

export const ADMIN_NOTIFICATION_EMAIL = 'nestcy770@gmail.com';
export const FOUNDER_WHATSAPP_NUMBER = '260973732409'; // +260 973 732 409

/**
 * 1. DIRECT EMAIL NOTIFICATION VIA FORMSUBMIT AJAX
 * Submits rich consultation data directly to nestcy770@gmail.com
 */
export async function sendConsultationEmailNotification(
  data: ConsultationBookingData
): Promise<{ success: boolean; message: string }> {
  try {
    const formattedPhone = `${data.phoneCountryCode} ${data.phoneNumber}`.trim();
    const channelsList = data.currentSalesChannels.length > 0 
      ? data.currentSalesChannels.join(', ') 
      : 'None specified';

    const payload = {
      _subject: `🔥 [Mupezeni AI] New Consultation Booking: ${data.businessName} (${data.ownerName})`,
      _replyto: data.email,
      _template: 'table',
      _captcha: 'false',
      'Retail Business / Store': data.businessName,
      'Owner / Contact Name': data.ownerName,
      'Work Email': data.email,
      'WhatsApp / Phone': formattedPhone,
      'City / Location': data.city,
      'Retail Sector': data.businessCategory,
      'Implementation Path': data.implementationPath === 'path1-build' 
        ? 'Path 1: Build Digital Store (No current online presence)' 
        : data.implementationPath === 'path2-upgrade' 
          ? 'Path 2: Upgrade Existing Store (Shopify / WooCommerce / Website)' 
          : 'To be determined during consultation',
      'Active Sales Channels': channelsList,
      'Monthly Customer Inquiries': data.monthlyEnquiries,
      'Preferred Format': data.preferredConsultationMethod,
      'Key Bottleneck / Challenge': data.biggestChallenge,
      'Submission Timestamp': new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'Africa/Lusaka'
      })
    };

    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('FormSubmit email endpoint returned non-200:', errText);
      return { 
        success: false, 
        message: 'Could not automatically relay email via FormSubmit. Use direct email fallback.' 
      };
    }

    const result = await response.json();
    return { 
      success: true, 
      message: result?.message || 'Email successfully dispatched to founder inbox.' 
    };
  } catch (error) {
    console.error('Error dispatching consultation email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown email dispatch error' 
    };
  }
}

/**
 * 2. INSTANT WHATSAPP NOTIFICATION LINK BUILDER
 * Generates an instant WhatsApp chat link addressed to +260 971 634 388 with pre-filled lead details.
 */
export function generateWhatsAppBookingUrl(data: ConsultationBookingData): string {
  const formattedPhone = `${data.phoneCountryCode} ${data.phoneNumber}`.trim();
  const channelsList = data.currentSalesChannels.join(', ') || 'Not specified';

  const pathDescription = data.implementationPath === 'path1-build'
    ? 'Path 1: Build Digital Store (No current online presence)'
    : data.implementationPath === 'path2-upgrade'
      ? 'Path 2: Upgrade Existing Store (Shopify / WooCommerce / Website)'
      : 'To be determined';

  const text = 
`*⚡ NEW CONSULTATION BOOKING — MUPEZENI AI*

*Store / Brand:* ${data.businessName}
*Owner:* ${data.ownerName}
*Contact Email:* ${data.email}
*Phone / WhatsApp:* ${formattedPhone}
*Location:* ${data.city}
*Retail Sector:* ${data.businessCategory}
*Implementation Track:* ${pathDescription}
*Sales Channels:* ${channelsList}
*Monthly Volume:* ${data.monthlyEnquiries} inquiries/mo
*Preferred Format:* ${data.preferredConsultationMethod}

*Primary Bottleneck / Priority:*
"${data.biggestChallenge}"

_Submitted from Mupezeni AI website booking portal._`;

  return `https://wa.me/${FOUNDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct Mailto fallback for 100% reliable local client email creation
 */
export function generateMailtoLink(data: ConsultationBookingData): string {
  const formattedPhone = `${data.phoneCountryCode} ${data.phoneNumber}`.trim();
  const subject = `[Mupezeni AI] Consultation Booking: ${data.businessName} - ${data.ownerName}`;
  const body = 
`Hello Ernest,

Here are the details for our AI Growth Consultation booking:

- Store Name: ${data.businessName}
- Contact Person: ${data.ownerName}
- Email: ${data.email}
- Phone: ${formattedPhone}
- City: ${data.city}
- Sector: ${data.businessCategory}
- Implementation Track: ${data.implementationPath || 'To be determined'}
- Sales Channels: ${data.currentSalesChannels.join(', ')}
- Monthly Volume: ${data.monthlyEnquiries}
- Preferred Format: ${data.preferredConsultationMethod}

Primary Bottleneck / Goal:
${data.biggestChallenge}

Looking forward to our session!`;

  return `mailto:${ADMIN_NOTIFICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * 3. DATABASE LOGGING (FIREBASE FIRESTORE)
 * Persists the lead into Firestore under /consultations/{id}
 */
export async function saveConsultationToFirestore(
  data: ConsultationBookingData,
  emailDispatched: boolean = true
): Promise<{ id: string; success: boolean }> {
  try {
    const formattedPhone = `${data.phoneCountryCode} ${data.phoneNumber}`.trim();

    const consultationPayload = {
      fullName: data.ownerName.trim(),
      email: data.email.trim(),
      phone: formattedPhone,
      storeName: data.businessName.trim(),
      city: data.city.trim(),
      businessCategory: data.businessCategory,
      channels: data.currentSalesChannels,
      monthlyOrders: data.monthlyEnquiries,
      primaryGoal: data.biggestChallenge.trim(),
      preferredFormat: data.preferredConsultationMethod,
      implementationPath: data.implementationPath || 'undecided',
      status: 'pending' as ConsultationStatus,
      createdAt: new Date().toISOString(),
      adminNotes: '',
      source: 'Mupezeni Retail Diagnostic Form',
      emailDispatched
    };

    const docRef = await addDoc(collection(db, 'consultations'), consultationPayload);
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error logging consultation to Firestore:', error);
    // Fallback ID so UI can proceed gracefully
    return { id: `local-${Date.now()}`, success: false };
  }
}

/**
 * Real-time listener for consultation bookings (Admin Portal)
 */
export function subscribeConsultations(
  callback: (records: ConsultationRecord[]) => void
): () => void {
  try {
    const consultationsRef = collection(db, 'consultations');
    const q = query(consultationsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records: ConsultationRecord[] = snapshot.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            fullName: raw.fullName || '',
            email: raw.email || '',
            phone: raw.phone || '',
            storeName: raw.storeName || '',
            city: raw.city || '',
            businessCategory: raw.businessCategory || '',
            channels: Array.isArray(raw.channels) ? raw.channels : [],
            monthlyOrders: raw.monthlyOrders || '',
            primaryGoal: raw.primaryGoal || '',
            preferredFormat: raw.preferredFormat || 'Google Meet',
            status: (raw.status as ConsultationStatus) || 'pending',
            createdAt: raw.createdAt || new Date().toISOString(),
            adminNotes: raw.adminNotes || '',
            source: raw.source || '',
            emailDispatched: !!raw.emailDispatched
          };
        });
        callback(records);
      },
      (error) => {
        console.warn('Firestore subscription error (checking fallback):', error);
        callback([]);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not initialize Firestore listener:', err);
    return () => {};
  }
}

/**
 * Update consultation status or notes in Firestore
 */
export async function updateConsultation(
  id: string,
  updates: Partial<ConsultationRecord>
): Promise<void> {
  if (!id || id.startsWith('local-')) return;
  const docRef = doc(db, 'consultations', id);
  await updateDoc(docRef, updates);
}

/**
 * Delete consultation record from Firestore
 */
export async function deleteConsultation(id: string): Promise<void> {
  if (!id || id.startsWith('local-')) return;
  const docRef = doc(db, 'consultations', id);
  await deleteDoc(docRef);
}
