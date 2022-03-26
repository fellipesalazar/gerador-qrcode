/* ########## FUNCTIONS ########## */

// função que cria o QR Code
function geraQRCode() {
    const link = encodeURIComponent($('#linkQRCode').val()),
        GoogleCharts = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=',
        loadBtn = $('#btnGera .load'),
        textBtn = $('#btnGera .text'),
        imgQRCode = $('#qrCode'),
        urlQRCode = GoogleCharts + link;

    imgQRCode.attr('src', urlQRCode);
    loadBtn.show();
    textBtn.hide();
    imgQRCode.on('load', () => {
        loadBtn.hide();
        textBtn.show();
        abrePopup();
    });
}

// função que abre o pop-up de download
function abrePopup() {
    const popup = $(".popup"),
        backdrop = $(".backdrop"),
        popupArea = $(".popup-area");

    popup.addClass("ativo");
    backdrop.addClass("ativo");
    popupArea.delay(250).addClass("ativo");
}

// função que fecha o pop-up de download
function fechaPopup() {
    const popup = $(".popup"),
        backdrop = $(".backdrop"),
        popupArea = $(".popup-area");

    popupArea.removeClass("ativo");
    backdrop.delay(250).removeClass("ativo");
    popup.delay(300).removeClass("ativo");
}

// função que converte o url da imagem para base64
const converteEmBase64 = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

// função que realiza o download do QR Code
function baixaQRCode() {
    const link = document.createElement('a'),
          loadBtn = $('#btnGera .load'),
          textBtn = $('#btnGera .text'),
          imgQRCode = $('#qrCode');

    converteEmBase64(imgQRCode.attr("src")).then((data) => {
        link.href = data;
    });
    
    link.download = 'QR Code';
    document.body.appendChild(link);

    loadBtn.show();
    textBtn.hide();

    setTimeout(() => {
        loadBtn.hide();
        textBtn.show();
        link.click();
        document.body.removeChild(link);
    }, 1500);
}


/* ########## ACTIONS ########## */

// executa a função de criação do QR Code ao clicar no botão e abre o popup
$('#btnGera').click(() => {
    geraQRCode();
});

// executa a função de fechar o pop-up
$('.popup-close').click(() => {
    fechaPopup();
});

// executa a função de baixar o QR Code
$('#btnDownload').click(() => {
    baixaQRCode();
});