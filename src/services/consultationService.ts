import { ConsultationBookingData, ConsultationRecord } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';

const WHATSAPP_PHONE = '260776091393'; // Official WhatsApp Contact: 0776091393
const NOTIFICATION_EMAIL = 'hello.mupezeni@gmail.com';

export const generateWhatsAppBookingUrl = (data: ConsultationBookingData): string => {
  const text = `*New Retail Strategy Consultation Booking*
• *Store / Brand:* ${data.businessName}
• *Contact Person:* ${data.ownerName}
• *Phone:* ${data.phoneCountryCode} ${data.phoneNumber}
• *Email:* ${data.email}
• *City / Country:* ${data.city}
• *Category:* ${data.businessCategory}
• *Current Channels:* ${data.currentSalesChannels.join(', ') || 'N/A'}
• *Enquiries Vol:* ${data.monthlyEnquiries}
• *Primary Challenge:* ${data.biggestChallenge}
• *Format:* ${data.preferredConsultationMethod}
• *Track:* ${data.implementationPath || 'Not decided'}`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const generateMailtoLink = (data: ConsultationBookingData): string => {
  const subject = `AI Strategy Booking: ${data.businessName} (${data.ownerName})`;
  const body = `Hello Mupezeni Team,

I would like to book a 30-minute retail AI strategy session.

Here are my store details:
- Store Name: ${data.businessName}
- Contact Person: ${data.ownerName}
- Phone: ${data.phoneCountryCode} ${data.phoneNumber}
- Email: ${data.email}
- Location: ${data.city}
- Business Type: ${data.businessCategory}
- Current Channels: ${data.currentSalesChannels.join(', ')}
- Monthly Enquiries: ${data.monthlyEnquiries}
- Primary Challenge: ${data.biggestChallenge}
- Preferred Format: ${data.preferredConsultationMethod}
- Track: ${data.implementationPath || 'Undecided'}

Looking forward to our session!`;

  return `mailto:${NOTIFICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const sendConsultationEmailNotification = async (data: ConsultationBookingData): Promise<boolean> => {
  try {
    // In production, triggers Cloud Function / webhook or backend mailer
    console.log('[NotificationService] Dispatching consultation email notification:', data);
    return true;
  } catch (err) {
    console.warn('[NotificationService] Failed to send email notification:', err);
    return false;
  }
};

const LOCAL_STORAGE_KEY = 'mupezeni_consultations_store';

export const saveConsultationToFirestore = async (
  data: ConsultationBookingData,
  emailDispatched: boolean = true
): Promise<string> => {
  const newRecord: Omit<ConsultationRecord, 'id'> = {
    fullName: data.ownerName,
    email: data.email,
    phone: `${data.phoneCountryCode} ${data.phoneNumber}`,
    storeName: data.businessName,
    city: data.city,
    businessCategory: data.businessCategory,
    channels: data.currentSalesChannels,
    monthlyOrders: data.monthlyEnquiries,
    primaryGoal: data.biggestChallenge,
    preferredFormat: data.preferredConsultationMethod,
    status: 'pending',
    createdAt: new Date().toISOString(),
    implementationPath: data.implementationPath || 'undecided',
    adminNotes: '',
    source: 'Website Booking Form',
    emailDispatched
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, 'consultations'), newRecord);
      return docRef.id;
    }
  } catch (err) {
    console.warn('Firestore write failed, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  const existing = getStoredLocalRecords();
  const id = 'local_' + Date.now();
  const fullRecord: ConsultationRecord = { id, ...newRecord };
  existing.unshift(fullRecord);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
  return id;
};

export const getConsultationsFromFirestore = async (): Promise<ConsultationRecord[]> => {
  try {
    if (db) {
      const q = query(collection(db, 'consultations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ConsultationRecord, 'id'>)
        }));
      }
    }
  } catch (err) {
    console.warn('Firestore fetch failed, returning localStorage consultations:', err);
  }

  return getStoredLocalRecords();
};

export const updateConsultationStatusInFirestore = async (
  id: string,
  status: ConsultationRecord['status'],
  notes?: string
): Promise<void> => {
  try {
    if (db && !id.startsWith('local_')) {
      const docRef = doc(db, 'consultations', id);
      await updateDoc(docRef, {
        status,
        ...(notes !== undefined ? { adminNotes: notes } : {})
      });
      return;
    }
  } catch (err) {
    console.warn('Firestore update failed, updating localStorage:', err);
  }

  const existing = getStoredLocalRecords();
  const updated = existing.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { adminNotes: notes } : {})
      };
    }
    return item;
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
};

function getStoredLocalRecords(): ConsultationRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }
  return [];
}
