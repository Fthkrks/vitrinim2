import React from "react";

function DeliveryanReturn() {
  return (
    <>
      <div className="">
        <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md mt-10">
          <h1 className="text-3xl font-bold text-center mb-6">
            Teslimat ve İade Politikası
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">TESLİMAT POLİTİKASI</h2>
            <p>
              SaaS platformumuzda sağlanan tüm yazılım hizmetleri ve dijital
              ürünler, elektronik ortamda teslim edilir. Aşağıdaki teslimat
              şartları geçerlidir:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>
                <strong>Hizmetin Teslimi:</strong> Yazılım ürününe veya
                hizmetine erişim, ödeme işlemi tamamlandıktan hemen sonra
                sağlanacaktır. Hizmet teslimi, kullanıcının kayıtlı e-posta
                adresine gönderilecek doğrulama e-postası ile
                gerçekleştirilecektir.
              </li>
              <li>
                <strong>Fiziksel Teslimat Yok:</strong> SaaS platformu bir
                dijital hizmet sunduğu için fiziksel bir teslimat söz konusu
                değildir.
              </li>
              <li>
                <strong>Geç Teslimat:</strong> Teknik bir aksaklık sebebiyle
                hizmetin teslim edilmesinde gecikme olması durumunda,
                kullanıcıya destek sağlanacaktır. Böyle bir durumda lütfen
                müşteri hizmetleri ile iletişime geçiniz.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">İADE POLİTİKASI</h2>
            <p>
              Dijital ürünler ve yazılım hizmetlerinin doğası gereği, hizmet
              kullanıma sunulduktan sonra iade yapılması mümkün değildir. İade
              politikamız şu şekildedir:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>
                <strong>Cayma Hakkı:</strong> Eğer kullanıcı, satın aldığı
                hizmetin kullanıma açılmasından önce cayma hakkını kullanmak
                isterse, 14 gün içerisinde iade talebinde bulunabilir. Ancak,
                yazılım ürününe veya dijital içeriğe erişim sağlandıktan sonra
                cayma hakkı geçersizdir.
              </li>
              <li>
                <strong>Hizmetin İptali:</strong> Alıcı, hizmeti almaya
                başlamadan önce iptal edebilir. İptal işlemi tamamlandığında,
                ödenen ücret iade edilir.
              </li>
              <li>
                <strong>İade Koşulları:</strong> Hizmetin kullanıma
                sunulmasından sonra herhangi bir iade yapılmayacaktır. Ancak,
                hizmetin sunumunda bir sorun yaşanması veya vaat edilen
                özelliklerin sağlanamaması durumunda, iade talebi
                değerlendirilecektir.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">İADE SÜRECİ</h2>
            <p>
              İade sürecini başlatmak için, müşteri hizmetleri ile iletişime
              geçerek iade talebinde bulunabilirsiniz. Talebiniz
              değerlendirilecek ve uygun bulunması durumunda, ödeme yöntemine
              göre iade işlemi yapılacaktır. İade işlemleri genellikle 5-10 iş
              günü içerisinde tamamlanmaktadır.
            </p>
          </section>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">
              © 2024 Vitrinim.co Tüm hakları saklıdır.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default DeliveryanReturn;
