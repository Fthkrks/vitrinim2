"use client"
import { useRouter } from "next/navigation";

function Pricing() {
  const router = useRouter();

  const handlePurchase = (price, packetType) => {
    router.push(`/payment?price=${price}&packetType=${packetType}`);
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
            <button onClick={() => handlePurchase(200, "1-year")} className="btn btn-secondary text-center">
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
            <button onClick={() => handlePurchase(300, "lifetime")} className="btn btn-secondary text-center">
              Satın Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
