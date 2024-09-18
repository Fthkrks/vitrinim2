"use client";
import moment from "moment";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { PAYMENT_URL } from "../../config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserDetailContext } from "../_context/UserStatesContext";
import { useUser } from "@clerk/nextjs";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [paymentType, setPaymentType] = useState(null);
  const [packetType, setPacketType] = useState(null);
  const [expirationDates, setExpirationDates] = useState("")
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const { user } = useUser();


  const userId = userDetail[0]?._id;
  let email = user?.emailAddresses[0]?.emailAddress;
  let firstname = user?.firstName;
  let lastname = user?.lastName;
  
  

  
  

  useEffect(() => {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const price = urlParams.get("price");
    const type = urlParams.get("packetType");

    // Validate and set paymentType
    if (price === "200" || price === "300") {
      setPaymentType(price);
    } else {
      setPaymentType(null); // Or set a default value or handle error
    }

    // Validate and set packetType
    if (type === "1-year" || type === "lifetime") {
      setPacketType(type);
    } else {
      setPacketType(null); // Or set a default value or handle error
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentType || !packetType) {
      router.replace("/upgrade");
      toast.error("Lütfen ilk önce paket seçiniz");
    }

    if (packetType === "1-year") {
      // Ödeme başarılı olduğunda abonelik süresini bir yıl ekle
      const currentDate = new Date();
      const oneYearLater = moment(currentDate).add(1, "year").toDate();
      setExpirationDates(oneYearLater)

      
    }

    const paymentCard = {
      cardHolderName: holderName,
      cardNumber: cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: cvc,
      registerCard: "0",
    };

    const buyer = {
      id: userId,
      name: firstname,
      surname: lastname || "Doe",
      gsmNumber: "+90535000000",
      email: email,
      identityNumber: "7430086644791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Nidakule Göztepe Merdivenkoy mah. Bora sok. No:1",
      ip: "85.34.78.112",
      country: "Turkey",
      city: "İstanbul",
      zipCode: "34732",
    };

    const shippingAddress = {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Nidakule Göztepe Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732",
    };

    const billingAddress = {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Nidakule Göztepe Merdivenkoy mah. Bora sok. No:1",
      zipCode: "34732",
    };

    const basketItems = [
      {
        id: "BI101",
        price: paymentType, // Ürün fiyatı ondalıklı formatta olmalı
        name: packetType,
        category1: "Bıo App", // İyzico için category1 zorunlu
        itemType: "VIRTUAL",
      },
    ];

    const paymentData = {
      price: paymentType, // Toplam fiyat
      paidPrice: paymentType, // Ödenen fiyat
      currency: "TRY",
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
      id: userId,
      packetType: packetType,
      expirationDate: expirationDates


    };

    try {
       await axios.post(`${PAYMENT_URL}/payment/threeds`, paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res =>{
        const paymentPageUrl = res.data.paymentPageUrl;
        const conversationId = res.data.conversationId;
        window.open(paymentPageUrl);
        //   try {
        //     console.log(conversationId);
            
        //     const res = await axios.post(`${PAYMENT_URL}/payment/check`, { conversationId });
            
        //     // Ödeme kontrolü başarılı ise interval'i durdur
        //     if (res.data.status === 'success') {
        //       console.log("payment success",res);
              
              
        //       clearInterval(checkResponse);
        //     }
        //   } catch (error) {
        //     console.error('Ödeme kontrol hatası:', error);
        //   }
        // }, 5000); 

      });
    

    
      // Ödeme sayfasını açıyoruz

    
      // Interval kontrol işlemi için bir ID oluşturuyoruz
 // 5 saniyede bir kontrol yapılıyor
    } catch (error) {
      console.error('Ödeme işlemi hatası:', error);
    }
    
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-10 font-bold text-4xl">Ödeme Yap</h1>
        <form onSubmit={handlePayment} className="w-1/2 flex flex-col gap-y-10">
          <div>
            <input
              type="text"
              placeholder="Ad Soyad"
              required
              onChange={(e) => setHolderName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Kart Numarası"
              onChange={(e) => setCardNumber(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-x-10">
            <input
              type="text"
              required
              placeholder="Son kullanım ayı"
              onChange={(e) => setExpireMonth(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              required
              placeholder="Son kullanım yılı"
              onChange={(e) => setExpireYear(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="CVC"
              onChange={(e) => setCvc(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-secondary w-full">
            Ödeme Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
