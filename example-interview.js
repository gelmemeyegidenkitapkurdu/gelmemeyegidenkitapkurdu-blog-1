// Örnek röportaj verileri
const exampleInterview = {
  id: Date.now().toString(),
  title: "Edebiyat Dünyasında Kadın Yazarlar",
  image: "https://public.youware.com/users-website-assets/prod/706f2595-99eb-435f-b9ad-4ea6b1d680ac/4f38b6e4464442a8af9265233947205f.jpg",
  excerpt: "Ünlü yazar Ayşe Kulin ile edebiyat dünyasında kadın yazarların deneyimleri, zorlukları ve başarıları üzerine keyifli bir sohbet.",
  interviewer: "Gelmemeyegiden Kitap Kurdu",
  interviewee: "Ayşe Kulin",
  dialogs: [
    {
      speaker: "interviewer",
      content: "Öncelikle bu röportaj için zaman ayırdığınız için teşekkür ederim. Edebiyat dünyasında bir kadın yazar olarak karşılaştığınız zorluklar nelerdi?"
    },
    {
      speaker: "interviewee",
      content: "Rica ederim, ben teşekkür ederim davetiniz için. Kadın bir yazar olarak başlangıçta ciddiye alınmamak en büyük zorluktu. Sanki kadınlar sadece aşk romanları yazabilirmiş gibi bir algı vardı. Ama zamanla bu algıyı kırdığımı düşünüyorum."
    },
    {
      speaker: "interviewer",
      content: "Yazarlık yolculuğunuza nasıl başladınız? İlk eserinizi yayımlatma sürecinde neler yaşadınız?"
    },
    {
      speaker: "interviewee",
      content: "İlk öykülerimi lisede yazmaya başladım. Ama profesyonel anlamda yazarlığa adım atmam uzun yıllar sonra oldu. İlk kitabım için tam 12 yayınevine başvurdum ve hepsinden ret aldım. 13. yayınevi şansım oldu ve kitabım beklenmedik bir ilgi gördü."
    },
    {
      speaker: "interviewer",
      content: "Genç yazarlara, özellikle de kadın yazarlara ne gibi tavsiyelerde bulunursunuz?"
    },
    {
      speaker: "interviewee",
      content: "Öncelikle çok okumalarını ve asla vazgeçmemelerini tavsiye ederim. Kadın ya da erkek, bir yazar her şeyden önce iyi bir gözlemci olmalı. Etrafınızdaki dünyayı ve insanları gözlemleyin. Ve en önemlisi, kendi sesinizi bulun. Başkalarının beklentilerine göre değil, kendi kalbinizin sesini dinleyerek yazın."
    },
    {
      speaker: "interviewer",
      content: "Son yıllarda Türk edebiyatında kadın yazarların daha görünür olduğunu düşünüyor musunuz?"
    },
    {
      speaker: "interviewee",
      content: "Kesinlikle! Artık çok daha fazla kadın yazar var ve seslerini duyurabiliyorlar. Eskiden erkek egemen bir alan olan edebiyatta kadınlar artık çok güçlü bir şekilde var oluyorlar. Bu beni çok mutlu ediyor. Genç kadın yazarların cesareti ve özgüveni beni umutlandırıyor."
    },
    {
      speaker: "interviewer",
      content: "Sizce teknoloji ve sosyal medya, yazarların okuyucularıyla ilişkisini nasıl değiştirdi?"
    },
    {
      speaker: "interviewee",
      content: "Sosyal medya, yazarlar ve okurlar arasındaki mesafeyi azalttı. Bu çok değerli bir şey. Eskiden bir yazara ulaşmak çok zordu, şimdi bir tık uzaktalar. Ayrıca yazarların da okurlarının tepkilerini anında görebilmeleri çok değerli. Ama bir dezavantajı da sürekli erişilebilir olma baskısı yaratması. Bazen yazabilmek için yalnızlığa ve sessizliğe ihtiyaç duyuyoruz."
    },
    {
      speaker: "interviewer",
      content: "Son olarak, şu anda üzerinde çalıştığınız yeni projeler var mı? Okuyucularınız yakın zamanda yeni bir eserinizle buluşabilecek mi?"
    },
    {
      speaker: "interviewee",
      content: "Evet, şu anda bir roman üzerinde çalışıyorum. Cumhuriyet döneminde geçen, güçlü bir kadın karakterin hikayesini anlatıyor. Muhtemelen önümüzdeki yıl okuyucularla buluşacak. Ayrıca daha önce yazdığım bir romanın film uyarlaması için de görüşmeler yapıyoruz. Umarım o da yakında hayata geçer."
    }
  ],
  category: "yazar-roportaj",
  date: new Date().toISOString()
};

// LocalStorage'a ekle
const currentInterviews = JSON.parse(localStorage.getItem('blogInterviews')) || [];
currentInterviews.unshift(exampleInterview);
localStorage.setItem('blogInterviews', JSON.stringify(currentInterviews));

console.log("Örnek röportaj başarıyla eklendi!");