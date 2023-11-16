import { Alert } from 'react-native';
import FIREBASE from '../config/FIREBASE'
import { clearStorage, getData, storeData } from '../utils/localStorage';

export const addMakanan = async (data) => {
    try {
      // Ambil data yg sudah login dari fungsi 'getData'
      const userData = await getData('user');
  
      if (userData) {
        // Tambah note sesuai uid
        const dataBaru = {
          ...data,
          uid: userData.uid
        };
  
        await FIREBASE.database().ref('makanans/' + userData.uid).push(dataBaru);
  
        console.log('Makanan added successfully');
      } else {
        Alert.alert('Error', 'Login Terlebih Dahulu');
      }
    } catch (error) {
      throw error;
    }
  }
  
  export const getMakanan = async () => {
    const userData = await getData('user');
    const notesRef = FIREBASE.database().ref('makanans/' + userData.uid);
  
    return notesRef.once('value')
      .then((snapshot) => {
        const makanansData = snapshot.val();
        if (makanansData) {
          const makanansArray = Object.entries(makanansData).map(([makananId, makananData]) => ({
            makananId,
            ...makananData,
          }));
          return makanansArray;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error('Error fetching user notes:', error);
        return [];
      });
  };

  export const deleteMakanan = async (makananId) => {
    try {
      const userData = await getData('user');
  
      if (!userData) {
        Alert.alert('Error', 'Login Terlebih Dahulu');
        return;
      }
  
      const noteRef = FIREBASE.database().ref(`makanans/${userData.uid}/${makananId}`);
      const snapshot = await noteRef.once('value');
      const existingMakanan = snapshot.val();
  
      if (!existingMakanan) {
        console.log('Makanan not found');
        return;
      }
  
      // Hapus catatan dari database
      await noteRef.remove();
      console.log('Makanan deleted successfully');
    } catch (error) {
      throw error;
    }
  };