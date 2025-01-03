import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const axiosInstance = axios.create({baseURL: 'http://192.168.1.71:3000'})

axiosInstance.interceptors.request.use(async (config)=>{
    
    const token = await AsyncStorage.getItem('jwtToken');
    if (token){
        console.log('balls')
        config.headers.Authorization = `Bearer ${token}`
        
    }

    return config;
});

export default axiosInstance;