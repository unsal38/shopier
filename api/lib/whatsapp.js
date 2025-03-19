const axios = require('axios');
async function send_message(telnumber, template, text, text_body, text_body1, text_body2, text_body3) {
    const token_whatsupp = "EAAI0JzvxMdIBOZBZAxy9qBgdk1S2ZC4jhSOvJH4wh1FZCzTGVsePPoSs21m87d1ghlTXcOt4quZA3nzoA7LEd69dwcpKvAL8inYjRqPsrAGp8EW8SIdjWCkzkowetTF5xeYhjBMiJYGfG3mX8EZCQMBqvp2WOsnnFVYsPC4eEJeJCZBhfSEA4aJWWFz6ZB2PVvZAb0QZDZD"
    const Phone_number_ID = "591846767344616" // TEST NUMARASI +1 555 632 0108 sonrasında kendi numaran yap
    const version_number = "v22.0"
    const gonderilen_numaralar = telnumber
    const template_name = template // siparisler // reklam2 // kargoteslim
    const WhatsApp_Business_Account_ID = "1213288283477370"

    //geçici alınan token  
    //const token = "EAAI0JzvxMdIBO6XjrpF34PgdOd380uNEPW4ZCFTeiaTsIMYb4hpf6XLviA3mQeobWaRS8Tn1XbIAwZC4rrZBoF55Oe28Wutel1xIauJd7Vv5wjTrsKjF0ZB8CZCvutA5DtdaDzQDyCWqmAndXlLTmrVnQlknS1ZARamafmQBZBZC5YvjReEjXDoKpPSnnwZCKAA1Te7maQuH3xXzinisE1Y1WAZBN93NTl2rkQz2AZD"

    

    if (text !== null && text !== "kargo") {
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": `9${gonderilen_numaralar}`,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {
                    "code": "tr",
                    "policy": "deterministic"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": text
                            }
                        ]
                    }
                ]
            }
        });
    }
    if (text === null) {
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": `9${gonderilen_numaralar}`,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {
                    "code": "tr"
                }
            }
        });
    }
    /////////   BİLGİLENDİRME 
    // text_body = kişi ad soyad
    // text_body1 = ödeme id
    // text_body2 = kargo firması
    // text_body3 = kargo takip numrası
    /////////
    if (text === "kargo") {
        const date_intl = Intl.DateTimeFormat("en-US").format(Date.now())
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": `9${gonderilen_numaralar}`,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {
                    "code": "tr",
                    "policy": "deterministic"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": text_body // ÜNSAL ÖZKARA
                            },
                            {
                                "type": "text",
                                "text": text_body1 // kargo numrası
                            },
                            {
                                "type": "text",
                                "text": date_intl // ÜNSAL ÖZKARA
                            },
                            {
                                "type": "text",
                                "text": text_body2 // ÜNSAL ÖZKARA
                            },
                            {
                                "type": "text",
                                "text": text_body3 // ÜNSAL ÖZKARA
                            }
                        ]
                    },
                ]
            }
        });
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/${version_number}/${Phone_number_ID}/messages`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_whatsupp}`
        },
        data: data
    };
    return axios.request(config)
        .then((response) => {
            //console.log(JSON.stringify(response.data));
            const data = response.data
            return data
        })
        .catch((error) => {
            console.log(error, "whatsupp error");
        });


}

module.exports = {
    send_message
}