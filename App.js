import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

class MyWeb extends React.Component {
  constructor(props) {
    super(props);
    this.webViewRef = React.createRef();
  }

  handleLogin = () => {
    if (this.webViewRef.current) {
      this.webViewRef.current.injectJavaScript('loginWithKakao();');
    }
  };
  

  render() {
    const customHTML = `
      <html>
        <head>
          <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
            integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8" crossorigin="anonymous"></script>
          <script>
            Kakao.init('12498b454b3b76c90c00a166d72d3eba');

            function loginWithKakao() {
              Kakao.Auth.authorize({
                redirectUri: 'https://fabian-fabparks-projects.vercel.app/',
              });
            }

            // 아래는 데모를 위한 UI 코드입니다.
            displayToken()
            function displayToken() {
              var token = getCookie('authorize-access-token');

              if(token) {
                Kakao.Auth.setAccessToken(token);
                Kakao.Auth.getStatusInfo()
                  .then(function(res) {
                    if (res.status === 'connected') {
                      document.getElementById('token-result').innerText
                        = 'login success, token: ' + Kakao.Auth.getAccessToken();
                    }
                  })
                  .catch(function(err) {
                    Kakao.Auth.setAccessToken(null);
                  });
              }
            }

            function getCookie(name) {
              var parts = document.cookie.split(name + '=');
              if (parts.length === 2) { return parts[1].split(';')[0]; }
            }
          </script>
        </head>
        <body style="display:flex; flex-direction: column;justify-content: center; 
          align-items:center; background-color: black; color:white; height: 100%;">
          <h1 style="font-size:100px; padding: 50px; text-align: center;" 
            id="h1_element">
            Kakao Login Test
          </h1>
          <h2 style="display: block; font-size:80px; padding: 50px; 
            text-align: center;" id="h2_element">
            Fabian Park
          </h2>
          <a id="kakao-login-btn" href="javascript:loginWithKakao()">
            <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
              alt="카카오 로그인 버튼" />
          </a>
          <p id="token-result"></p>
        </body>
      </html>
    `;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          ref={this.webViewRef}
          source={{ html: customHTML }} 
        />
      </SafeAreaView>
    );
  }
}

export default MyWeb;




