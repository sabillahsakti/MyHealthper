import { Alert } from 'react-native';
import FIREBASE from '../config/FIREBASE'
import { clearStorage, getData, storeData } from '../utils/localStorage';

export const addWorkout = async (data) => {
    try {
      // Ambil data yg sudah login dari fungsi 'getData'
      const userData = await getData('user');
  
      if (userData) {
        // Tambah note sesuai uid
        const dataBaru = {
          ...data,
          uid: userData.uid
        };
  
        await FIREBASE.database().ref('workouts/' + userData.uid).push(dataBaru);
  
        console.log('Workout added successfully');
      } else {
        Alert.alert('Error', 'Login Terlebih Dahulu');
      }
    } catch (error) {
      throw error;
    }
  }
  
  export const getWorkout = async () => {
    const userData = await getData('user');
    const notesRef = FIREBASE.database().ref('workouts/' + userData.uid);
  
    return notesRef.once('value')
      .then((snapshot) => {
        const workoutsData = snapshot.val();
        if (workoutsData) {
          const workoutsArray = Object.entries(workoutsData).map(([workoutId, workoutData]) => ({
            workoutId,
            ...workoutData,
          }));
          return workoutsArray;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error('Error fetching user notes:', error);
        return [];
      });
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