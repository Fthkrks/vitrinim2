import React from "react";

function Privacy() {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Gizlilik Sözleşmesi</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. GİRİŞ</h2>
          <p>
            Bu Gizlilik Sözleşmesi, SaaS platformumuzun kullanıcılarından
            topladığı kişisel verilerin nasıl kullanıldığını ve korunduğunu
            açıklamaktadır. Platformumuzu kullanarak, bu sözleşmede belirtilen
            şartları kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. TOPLANAN BİLGİLER</h2>
          <p>
            Hizmetlerimizi sunabilmek için çeşitli bilgiler toplarız. Bu
            bilgiler aşağıdaki gibidir:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              <strong>Kişisel Bilgiler:</strong> Ad, soyad, e-posta adresi,
              telefon numarası gibi bilgiler kaydedilir.
            </li>
            <li>
              <strong>Hizmet Kullanım Verileri:</strong> Hizmetlerimizi nasıl
              kullandığınızla ilgili bilgiler, cihaz bilgileri ve IP adresiniz
              gibi teknik veriler toplanabilir.
            </li>
            <li>
              <strong>Çerezler:</strong> Web sitemizdeki deneyiminizi
              geliştirmek amacıyla çerezler kullanılmaktadır. Çerezler,
              tarayıcınıza küçük dosyalar olarak kaydedilir.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. BİLGİLERİN KULLANIMI</h2>
          <p>
            Topladığımız kişisel veriler, aşağıdaki amaçlar doğrultusunda
            kullanılabilir:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Hizmetleri sunmak, geliştirmek ve kişiselleştirmek.</li>
            <li>Müşteri desteği sağlamak ve sorunları çözmek.</li>
            <li>Güvenlik amaçlı olarak hesaplarınızı korumak.</li>
            <li>Kullanıcı deneyimini iyileştirmek ve yeni hizmetler sunmak.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. BİLGİ PAYLAŞIMI VE ÜÇÜNCÜ TARAFLAR
          </h2>
          <p>
            Kişisel bilgilerinizi üçüncü taraflarla yalnızca aşağıdaki
            durumlarda paylaşırız:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              <strong>Hizmet Sağlayıcılar:</strong> Hizmetlerimizi sunmak için
              üçüncü taraf hizmet sağlayıcılarla işbirliği yapabiliriz (örneğin,
              ödeme işleme veya veri depolama hizmetleri).
            </li>
            <li>
              <strong>Yasal Yükümlülükler:</strong> Hukuki gereklilikler
              doğrultusunda veya yasal bir zorunluluk doğduğunda kişisel
              bilgilerinizi paylaşabiliriz.
            </li>
            <li>
              <strong>İş Transferi:</strong> Platformun satışı veya birleşmesi
              durumunda kişisel bilgiler yeni sahiplerle paylaşılabilir.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. BİLGİLERİN KORUNMASI</h2>
          <p>
            Kişisel verilerinizin güvenliği bizim için önemlidir. Bu nedenle,
            bilgilerinizin güvenliğini sağlamak için çeşitli teknik ve idari
            önlemler alırız. Ancak, internet üzerinden yapılan hiçbir veri
            aktarımının %100 güvenli olamayacağını unutmayın.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. KULLANICI HAKLARI</h2>
          <p>Kullanıcılar, aşağıdaki haklara sahiptir:</p>
          <ul className="list-disc list-inside mt-4">
            <li>Kişisel verilerine erişim hakkı.</li>
            <li>
              Yanlış veya eksik bilgilerin düzeltilmesini talep etme hakkı.
            </li>
            <li>
              Belirli durumlarda kişisel verilerinin silinmesini talep etme
              hakkı.
            </li>
            <li>Veri işleme faaliyetlerine itiraz etme hakkı.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. GİZLİLİK POLİTİKASINDA DEĞİŞİKLİKLER
          </h2>
          <p>
            Gizlilik politikasında değişiklik yapma hakkımız saklıdır. Politika
            değişiklikleri bu sayfada yayınlanacaktır. Değişiklikler yapıldıktan
            sonra hizmetlerimizi kullanmaya devam ederek yeni şartları kabul
            etmiş sayılırsınız.
          </p>
        </section>

        <footer className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Vitrinim.co Tüm hakları saklıdır.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Privacy;
