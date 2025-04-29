import React from 'react'
import { auth } from '../firebase/config';
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getGardens = async () => {
	try {
		const userId = auth.currentUser?.uid;
		if (!userId) {
			throw new Error('User not authenticated');
		}
		const gardensRef = collection(db, 'users', userId, 'gardens');
		const gardensSnapshot = await getDocs(gardensRef);
		return gardensSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
	} catch (error) {
		console.error('Error fetching gardens:', error);
		alert('Có lỗi xảy ra khi lấy danh sách vườn!');
		return [];
	}
};
export const addGarden = async (gardenData) => {
	try {
		const userId = auth.currentUser?.uid;
		if (!userId) {
			throw new Error('User not authenticated');
		}
		const gardensRef = collection(db, 'users', userId, 'gardens');
		// const docRef = await addDoc(gardensRef, {
		// 	...gardenData,
		// 	createdAt: new Date().toISOString(),
		// });
		const newDocRef = doc(gardensRef); // tạo docRef mới có sẵn id
		const timestamp = new Date().toISOString();

		await setDoc(newDocRef, {
			...gardenData,
			id: newDocRef.id,
			createdAt: timestamp,
		});
		console.log('Garden added:', newDocRef.id);
		alert('Thêm vườn thành công!');
		return newDocRef.id;
	} catch (error) {
		console.error('Error adding garden:', error);
		alert('Có lỗi xảy ra khi thêm vườn!');
	}
}

export const deleteGarden = async (gardenId) => {
	try {	
		console.log(gardenId);
		
		const userId = auth.currentUser?.uid;
		if (!userId) {
			throw new Error('User not authenticated');
		}
		const gardenRef = doc(db, 'users', userId, 'gardens', gardenId);
		await deleteDoc(gardenRef);
		alert('Xoá vườn thành công!');
	} catch (error) {
		console.error('Error deleting garden:', error);
		alert('Có lỗi xảy ra khi xoá vườn!');
}

}