import React from 'react'
import { auth, db } from '../firebase/config'
import { arrayUnion, collection, doc, onSnapshot, query, updateDoc, where, arrayRemove } from 'firebase/firestore'
import { Alert } from 'react-native';



export const listenToDevicesbyGarden = (gardenId, setDevices, deviceIds) => {
	const userId = auth.currentUser?.uid;
	console.log('userId: ', userId);
	console.log('gardenId: ', gardenId);
	console.log('deviceIds: ', deviceIds);
	
	
	if (!userId) {
		throw new Error('User not authenticated');
	}
	if (!Array.isArray(deviceIds) || deviceIds.length === 0) {
		setDevices([]);
		return () => {}; // Return an empty function to avoid memory leaks
	}
	
	const q = query(
		collection(db, 'devices'),
		where('gardenId', '==', gardenId),
		where('userId', '==', userId),
		where('deviceId', 'in', deviceIds)
	);
	
	const unsubscribe = onSnapshot(
		q,
		(snapshot) => {
		if (snapshot.empty) {
			console.log('No matching documents found!');
			setDevices([]);
			return;
		}
		const devices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));	
		console.log('cap nhap devices: ', devices);
		setDevices(devices);
		},
		(error) => {
			console.error('Error fetching devices:', error);
			alert('Có lỗi xảy ra khi lấy danh sách thiết bị!');
		}
	)
	
	return unsubscribe;
}

export const addDevice = async (gardenId, deviceId) => {
	try {
		const userId = auth.currentUser?.uid;
		const gardenRef = doc(db, 'users', userId, 'gardens', gardenId);
		await updateDoc(gardenRef, {
			deviceIds: arrayUnion(deviceId.trim())
		});
		Alert.alert('Đã thêm thiết bị');
	} catch (error) {
		console.log("lỗi khi thêm thiết bị: ", error)
	}
}

export const removeDevice = async (gardenId, deviceId) => {
	try {
		const userId = auth.currentUser?.uid;
		const gardenRef = doc(db, 'users', userId, 'gardens', gardenId);
		await updateDoc(gardenRef, {
			deviceIds: arrayRemove(deviceId.trim())
		});
	} catch (error) {
		console.log("lỗi khi xóa thiết bị: ", error)
	}
}
