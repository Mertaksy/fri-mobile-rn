import React from 'react';
import HTML from 'react-native-render-html';
import Theme from '../theme';

const TicariElektronikContent = () => {
    return (
        <HTML
            source={{ html: content }}
            tagsStyles={{
                body: {
                    fontSize: 14,
                    lineHeight: 20,
                    fontFamily: 'gilroy-medium',
                    color: '#56696a',
                },
                p: {
                    fontSize: 11,
                    lineHeight: 15,
                    fontFamily: 'gilroy-medium',
                    color: '#56696a',
                    marginBottom: 3,
                    marginTop: 3,
                },
                h1: {
                    color: Theme.palette.green,
                    marginBottom: 10,
                    fontSize: 16,
                    lineHeight: 20,
                    fontFamily: 'recoleta-semi-bold',
                    textAlign: 'center',
                },
                h2: {
                    color: Theme.palette.green,
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 14,
                    lineHeight: 15,
                    fontFamily: 'recoleta-semi-bold',
                },
            }}
        />
    );
};

export default TicariElektronikContent;

const content = `
<h1>BİZİM TARİFLER TİCARİ ELEKTRONİK İLETİ</h1>
<p>
Ticari elektronik ileti gönderilmesine onay verilmesi halinde Kullanıcılar/Üyeler, Bizim Tarifler’e  üye olurken vermiş oldukları ve bilahare muhtelif suretler ile verecekleri iletişim adreslerine (telefon numarası, e-posta adresi ve diğerlerine) gerek üyelik işlemleri ve uygulamaları ile akdi-kanuni hususlar hakkında bilgilendirilmeleri, gerek çeşitli ürün/hizmetlerin ve genel/özel imkanların duyurulması, tanıtım ve reklamının yapılması için Future Star E Ticaret A.Ş., KV2K Perakende Müşteri Hizmetleri A.Ş.,  Yıldız Holding A.Ş ve iştirakleri ile Gözde Girişim Sermayesi Yatırım Ortaklığı A.Ş. ve iştirakleri  tarafından ilgili kanunlara uygun olarak kendi ürün veya hizmetlerine ilişkin de ticari elektronik iletiler ve diğer iletiler gönderilebileceği; diledikleri zaman, hiçbir gerekçe belirtmeden vermiş oldukları iletişim bilgileri üzerinden kendileri ile genel ve özel kampanyalar, avantajlar, ürün, hizmet tanıtımları, reklâm, pazar araştırması anketleri ve diğer müşteri memnuniyeti uygulamaları ile ilgili iletişime geçilmesini reddedebilmelerinin yanında konuya ilişkin vazgeçme bildirimini her zaman gerçekleştirebileceklerini bildiklerini kabul ve beyan eder.
</p>`;
