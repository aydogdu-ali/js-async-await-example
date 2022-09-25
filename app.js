// Herhangi bir hatayı kullanıcaya göstermek için isError değişkeni tanımladık..

let isError = false;

// async-await yapısını kurduk
const getHaber = async function () {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?country=tr&apiKey=924053e34d584fd68f87334a4a724d5e"
    );
    if (!res.ok) {
      isError = true; // kullanıcıya hata vermek için kullandık
    }

    const data = await res.json(); // Json gelen bilgiyi array içinde attık.

    console.log(data.articles); // isteğin gelip gelmediğini kontrol ettik
    yazdırHaber(data.articles); // verileri DOM'a yazdırmak için fonksiyon yazdık.
  } catch (error) {
    console.log(error);
  }
};

// API den gelen verileri yazdıracak fonksiyonu tanımladık.
const yazdırHaber = function (özet) {
  console.log(özet);
  // gelen veri dizi içinde obje
  const haber = document.querySelector(".haber"); // Dom da veriyi append edeceğimiz elementi seçtik
  if (isError) {
    // hata durumunda kullanıcıyı bilgilendiriyoruz.
    haber.innerHTML += `<h2> Sayfaya Ulaşılamadı</h2>`;
    return; //anlamı hatalı ise aşağıdaki koda girme demektir.
  }

  özet.forEach((item) => {
    const { title, description, urlToImage, url } = item;

    haber.innerHTML += `<div class="col- md-6 col-lg-4 mb-3"> 
    <div class="card ">
      <img src="${urlToImage}" class="card-img-top" alt="picture">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a href="${url}"  target="_blank"class="btn btn-danger">Detaylar İçin Tıklaynız</a>
      </div>
    </div>
    </div>`;
  });
};

window.addEventListener("load", getHaber); // herşey yüklendiktan sonra getHaber çalışır
