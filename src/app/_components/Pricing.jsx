"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { PAYMENT_URL } from "../../config";
import { useUser } from "@clerk/nextjs";
import { useContext, useState } from "react";
import { UserDetailContext } from "../_context/UserStatesContext";
import moment from "moment";
import toast from "react-hot-toast";


function Pricing() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [expirationDates, setExpirationDates] = useState("");


  const { user } = useUser();


  const isPayment = userDetail[0]?.payment;
  const userId = userDetail[0]?._id;
  let email = user?.emailAddresses[0]?.emailAddress;
  let firstname = user?.firstName;
  let lastname = user?.lastName;


  const handlePayment = async (price, packetType) => {
    if (!userId) {
      router.replace("/sign-in");
      toast("Giriş yapamadan ödeme yapamazsınız!", {
        icon: '⚠️',
      });
      return;
    }
  
    if (isPayment) {
      router.replace("/admin");
      toast.success("Zaten daha önce ödeme yapmışsınız!");
      return;
    }
  
    let oneYearLater; // oneYearLater'ı burada tanımlıyoruz
  
    if (packetType === "1-year") {
      // Ödeme başarılı olduğunda abonelik süresini bir yıl ekle
      const currentDate = new Date();
      oneYearLater = moment(currentDate).add(1, "year").toDate(); // oneYearLater değişkenini güncelle
      setExpirationDates(oneYearLater); // State'i güncelle ama oneYearLater'ı hemen kullan
    }
  
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
        price: price, // Ürün fiyatı ondalıklı formatta olmalı
        name: packetType,
        category1: "Bıo App", // İyzico için category1 zorunlu
        itemType: "VIRTUAL",
      },
    ];
  
    const paymentData = {
      price: price, // Toplam fiyat
      paidPrice: price, // Ödenen fiyat
      currency: "TRY",
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
      id: userId,
      packetType: packetType,
      expirationDate: oneYearLater || expirationDates, // Eğer yeni tarih varsa onu kullan
    };
  
    try {
      await axios
        .post(`${PAYMENT_URL}/payment/threeds`, paymentData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const paymentPageUrl = res.data.paymentPageUrl;
          window.open(paymentPageUrl);
          setTimeout(() => {
            router.replace("/success");
          }, 5000);
        });
    } catch (error) {
      console.error("Ödeme işlemi hatası:", error);
    }
  };
  
   

  return (
    <div className=" md:h-screen mt-20 flex flex-col justify-center " id="pricing">
      <h2 className="font-bold text-3xl text-center">Fiyatlandırma</h2>
      <div className="flex md:flex-nowrap flex-wrap gap-y-10 md:justify-evenly mt-14">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">1 Yıllık Üyelik</h2>
            <p className="">Tek seferlik ödeme üyelik yok 1 sene sonra üyeliğiniz biter</p>
            <p className="text-center mt-10 font-bold text-4xl">
              200₺<span className="text-lg line-through">350₺</span>
            </p>
            <button onClick={() => handlePayment(200, "1-year")} className="btn btn-secondary text-center">
              Satın Al
            </button>
          </div>
        </div>
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">Sonsuz Üyelik</h2>
            <p className="">Tek seferlik ödeme sonrasında uygulama sonsuza kadar sizin</p>
            <p className="text-center mt-10 font-bold text-4xl">
              300₺<span className="text-lg line-through">500₺</span>
            </p>
            <button onClick={() => handlePayment(300, "lifetime")} className="btn btn-secondary text-center">
              Satın Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
