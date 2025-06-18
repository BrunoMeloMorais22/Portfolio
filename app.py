from flask import Flask, request, redirect, url_for, render_template, jsonify
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/contato", methods=["POST"])
def contato():
        data = request.get_json()

        nome = data.get("nome")
        email = data.get("email")
        mensagem = data.get("mensagem")

        msg = EmailMessage()
        msg['Subject'] = f"Nova mensagem do Portfolio - {nome}"
        msg['From'] = email
        msg['To'] = "grumelo098@gmail.com"
        msg.set_content(f"Mensagem de: {nome}\nEmail: {email}\n\n{mensagem}")

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login("grumelo098@gmail.com", 'ourf sgnz wkiw sxse')
                smtp.send_message(msg)
                return jsonify({"mensagem": "Email enviado com sucesso"}), 200
        except Exception as e:
            return jsonify({"mensagem": "Erro ao enviar email"})