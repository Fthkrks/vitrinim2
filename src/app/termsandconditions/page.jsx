import React from "react";

function Termsandconditions() {
  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md mt-10">
          <h1 className="text-3xl font-bold text-center mb-6">
            Şartlar ve Koşullar
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. GENEL BİLGİLER</h2>
            <p>
              Bu Şartlar ve Koşullar, SaaS platformumuzun kullanımını düzenler.
              Hizmetlerimize erişim sağlayarak bu şartları kabul etmiş
              sayılırsınız. Lütfen şartları dikkatlice okuyun.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. HİZMETİN TANIMI</h2>
            <p>
              SaaS platformumuz, kullanıcıların dijital hizmet ve yazılım
              çözümlerine erişimini sağlar. Hizmetin detayları ve kullanım
              şartları aşağıda belirtilmiştir:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>
                Kullanıcı, platforma kayıt olarak yazılım çözümlerimize
                erişebilir.
              </li>
              <li>
                SaaS hizmetleri abonelik bazlıdır ve hizmet süresi boyunca
                kullanılabilir.
              </li>
              <li>
                Hizmetimiz yalnızca yasal kullanım için sunulmaktadır.
                Platformumuzun amacı dışında kullanılması yasaktır.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. HESAP OLUŞTURMA VE GÜVENLİK
            </h2>
            <p>
              Kullanıcı, hizmetlerimize erişebilmek için doğru ve güncel
              bilgilerle bir hesap oluşturmalıdır. Kullanıcılar hesap
              bilgilerini gizli tutmakla sorumludur.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Kullanıcı, hesap bilgilerini kimseyle paylaşmamalıdır.</li>
              <li>
                Hesap bilgilerinin başkası tarafından yetkisiz kullanılması
                durumunda derhal bize bildirilmelidir.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. ABONELİK VE ÖDEME</h2>
            <p>
              SaaS hizmetlerimize erişim, belirlenen abonelik paketleri
              kapsamında sunulmaktadır. Kullanıcı, seçtiği abonelik paketi için
              belirtilen ücreti ödemekle yükümlüdür.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>
                Ödemeler kredi kartı, banka transferi veya diğer belirtilen
                yöntemlerle yapılabilir.
              </li>
              <li>Abonelik, ödeme tamamlandıktan sonra aktif hale gelir.</li>
              <li>
                Hizmet süresi dolduğunda, kullanıcı aboneliğini yenileyebilir.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. KULLANICI YÜKÜMLÜLÜKLERİ
            </h2>
            <p>
              Kullanıcılar, hizmetleri yasal ve dürüst bir şekilde
              kullanmalıdır. Aşağıdaki durumlar yasaktır:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Platformu yasa dışı faaliyetlerde kullanmak.</li>
              <li>
                Diğer kullanıcıların hesaplarına yetkisiz erişim sağlamak.
              </li>
              <li>
                Platformu bozma, zarar verme veya aşırı yükleme girişimleri.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. FİKRİ MÜLKİYET HAKLARI
            </h2>
            <p>
              Platformumuzdaki tüm içerik ve yazılım, fikri mülkiyet hakları
              kapsamında korunmaktadır. Kullanıcılar bu içeriği izinsiz
              kullanamaz, çoğaltamaz veya dağıtamaz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. HİZMETİN SONLANDIRILMASI
            </h2>
            <p>
              Platformumuz, kullanıcıların şartları ihlal etmesi durumunda
              hizmeti sonlandırma hakkına sahiptir. Hizmetin sonlandırılması
              durumunda, kullanıcının erişimi kalıcı olarak kaldırılacaktır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. SORUMLULUK SINIRLAMASI
            </h2>
            <p>
              Platformumuz, hizmetlerin kesintiye uğraması, veri kaybı veya
              herhangi bir teknik arıza nedeniyle oluşabilecek zararlar için
              sorumluluk kabul etmez. Kullanıcılar, hizmetlerimizi kendi
              sorumluluğunda kullanmaktadır.
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

export default Termsandconditions;
