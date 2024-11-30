from flask import Flask, render_template, send_from_directory, url_for
import os

app = Flask(__name__)

# 기본 라우트 설정
def create_app():
    static_folder = os.path.join(os.getcwd(), 'static')
    if not os.path.exists(static_folder):
        os.makedirs(static_folder)
    return app

@app.route('/')
def main_page():
    return render_template('main.html')

@app.route('/mypage')
def mypage():
    return render_template('mypage.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/qa')
def qa_page():
    return render_template('Q&A.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

# 배포 준비
if __name__ == "__main__":
    # 템플릿 폴더와 정적 파일 경로 설정
    app = create_app()
    app.template_folder = os.getcwd()
    app.static_folder = os.path.join(os.getcwd(), 'static')

    # 서버 시작
    app.run(host='0.0.0.0', port=5000, debug=True)
