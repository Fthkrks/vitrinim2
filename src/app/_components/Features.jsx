import React from "react";

function Features() {
  return (
    <div className="md:mt-20  md:h-screen flex flex-col justify-center ">
      <h2 className="font-bold text-3xl text-center">Sunduğumuz Özellikler!</h2>
      <div className="flex md:flex-nowrap gap-y-10 flex-wrap justify-between mt-14">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">
              Her şey Tek Sayfada
            </h2>
            <p className="">
              Tüm sosyal medya linklerinizi, yaptığınız projeleri ve kurduğunuz
              startupları tek bir sayfada toplayabilirsiniz
            </p>
          </div>
        </div>
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">
              Analiz Özelliğimiz
            </h2>
            <p className="">
              Hangi projeniz daha çok tıklandı projelerinize toplam kaç kişi
              tıklamış kolayca takip edebileceğiniz bir grafik sunuyoruz
            </p>
          </div>
        </div>
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">
              CV veya Portfolyö
            </h2>
            <p className="">
              İster CV olarak kullan ister Portfolyö olarak kullan sana kalmış !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
