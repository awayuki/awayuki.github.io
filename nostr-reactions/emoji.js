// const { currUnixtime } = require("./utils.js");
// const { relayInit } = require("nostr-tools");
// require("websocket-polyfill");
const relayInit = window.NostrTools.relayInit;

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

const container = document.querySelector('.container');

const main = async () => {
  const relay = relayInit( relayUrl );
  relay.on("error", () => {
    console.error("failed to connect");
  });

  /* Q-2: Relayオブジェクトのメソッドを呼び出して、リレーに接続してみよう */
  await relay.connect();

  /* Q-3: Relayオブジェクトのメソッドを使って、イベントを購読してみよう */
  const sub = relay.sub([
    { 
      "kinds": [7],
      "since": currUnixtime()
    }
  ]);

  // メッセージタイプごとにリスナーを設定できる
  sub.on("event", (ev) => {
    // Nostrイベントのオブジェクトがコールバックに渡る
    // console.log(ev.content);
    
    let emoji;
    if (ev.content == '+') {
      emoji = "💜";
    } else {
      emoji = ev.content;
    }

    console.log(emoji);

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const emojiBlock = '<div class="emoji" style="left:' + posX + '%;top:' + posY + '%;">' + emoji + '</div>';

    container.insertAdjacentHTML('beforeend', emojiBlock);

    
  });

  sub.on("eose", () => {
    console.log("****** EOSE ******");
  });
};

main().catch((e) => console.error(e));
