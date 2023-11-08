import { IconApi, IconCalculator, IconMeal, IconNotification, IconWorkout } from "../../assets";

export const dummyMenu = [
    {
        id:1,
        nama: 'Rekomendasi Resep',
        gambar: <IconMeal/>,
        halaman: 'Resep'
    },
    {
        id:2,
        nama: 'Workout',
        gambar: <IconWorkout/>,
        halaman: 'ChangePassword'
    },
    {
        id:3,
        nama: 'Kalkulator',
        gambar: <IconCalculator/>,
        halaman: 'History'
    },
    {
        id:4,
        nama: 'Notifikasi',
        gambar: <IconNotification/>,
        halaman: 'Login'
    },
];  