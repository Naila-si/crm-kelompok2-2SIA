from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/prediksi', methods=['POST'])
def prediksi():
    data = request.get_json()
    jumlah = data['jumlah_pemesanan']
    total = data['total_pembayaran']
    porsi = data['jumlah_porsi']

    # Aturan loyalitas sederhana
    if jumlah > 10 and total >= 3000000 and porsi >= 250:
        status = 'Gold'
        promo = 'Diskon 15% + Free Tester Premium'
    elif jumlah >= 6 and total >= 1500000 and porsi >= 100:
        status = 'Silver'
        promo = 'Diskon 10% + Bonus Ongkir'
    else:
        status = 'Bronze'
        promo = 'Diskon 5% untuk pesanan berikutnya'

    return jsonify({'status_pelanggan': status, 'rekomendasi_promo': promo})

if __name__ == '__main__':
    app.run(debug=True)

