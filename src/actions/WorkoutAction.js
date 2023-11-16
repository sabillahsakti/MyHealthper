import { Alert } from 'react-native';
import FIREBASE from '../config/FIREBASE'
import { clearStorage, getData, storeData } from '../utils/localStorage';

export const addWorkout = async (data) => {
  try {
    // Ambil data yang sudah login dari fungsi 'getData'
    const userData = await getData('user');

    if (userData) {
      // Tambah note sesuai uid dan tambahkan tanggal hari ini
      const dataBaru = {
        ...data,
        uid: userData.uid,
        tanggal: new Date().toISOString().split('T')[0], // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
      };

      await FIREBASE.database().ref('workouts/' + userData.uid).push(dataBaru);

      console.log('Workout added successfully');
    } else {
      Alert.alert('Error', 'Login Terlebih Dahulu');
    }
  } catch (error) {
    throw error;
  }
};
  
export const getWorkout = async () => {
  try {
    const userData = await getData('user');
    const notesRef = FIREBASE.database().ref('workouts/' + userData.uid);

    const todayDate = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD

    const snapshot = await notesRef.orderByChild('tanggal').equalTo(todayDate).once('value');

    const workoutsData = snapshot.val();

    if (workoutsData) {
      const workoutsArray = Object.entries(workoutsData).map(([workoutId, workoutdata]) => ({
        workoutId,
        ...workoutdata,
      }));
      return workoutsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    return [];
  }
};



  export const deleteWorkout = async (noteId) => {
    try {
      const userData = await getData('user');
  
      if (!userData) {
        Alert.alert('Error', 'Login Terlebih Dahulu');
        return;
      }
  
      const noteRef = FIREBASE.database().ref(`workouts/${userData.uid}/${noteId}`);
      const snapshot = await noteRef.once('value');
      const existingNote = snapshot.val();
  
      if (!existingNote) {
        console.log('Workout not found');
        return;
      }
  
      // Hapus catatan dari database
      await noteRef.remove();
      console.log('Note deleted successfully');
    } catch (error) {
      throw error;
    }
  };

  export const getAllWorkout = async () => {
    try {
      const userData = await getData('user');
      const notesRef = FIREBASE.database().ref('workouts/' + userData.uid);
  
      const snapshot = await notesRef.once('value');
  
      const workoutsData = snapshot.val();
  
      if (workoutsData) {
        const workoutsArray = Object.entries(workoutsData).map(([workoutId, workoutdata]) => ({
          workoutId,
          ...workoutdata,
        }));
        return workoutsArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching user workouts:', error);
      return [];
    }
  };
  