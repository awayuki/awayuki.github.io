const relayInit = window.NostrTools.relayInit;
const relayUrl = "wss://relay-jp.nostr.wirednet.jp";
const container = document.querySelector('.container');

const main = async () => {
  const relay = relayInit( relayUrl );
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();

  const sub = relay.sub([
    { 
      "kinds": [7],
      "since": currUnixtime()
    }
  ]);

  sub.on("event", (ev) => {
    
    let emoji;
    if (ev.content == '+') {
      emoji = '💜';
    } else {
      emoji = '🍡';
      // emoji = ev.content;
    }

    console.log(emoji);

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const emojiBlock = '<div class="emoji" style="left:' + posX + '%;top:' + posY + '%;">' + emoji + '</div>';

    container.insertAdjacentHTML('beforeend', emojiBlock);

    
  });

};

main().catch((e) => console.error(e));
