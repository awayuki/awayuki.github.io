const relayInit = window.NostrTools.relayInit;
const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

const container = document.querySelector('.emoji-wrapper');

let i = 0;
const createEmojiBlock = (emoji, posX, posY) => {
  const newDiv = document.createElement('div');
  newDiv.innerText = emoji;
  newDiv.style.left = posX + 'vw';
  newDiv.style.top = posY + 'vh';
  newDiv.classList.add('emoji');
  container.appendChild(newDiv);

  i++;
  if (Number.isInteger(i / 20)) {
    const emojiBlock = container.querySelectorAll('.emoji');
    for (const item of emojiBlock) {
      const style = window.getComputedStyle(item);
      let value = style.getPropertyValue('opacity');
      if (value == 0) {
        item.remove();
      }
    }
  }
}

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
      emoji = ev.content;
    }
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    createEmojiBlock(emoji, posX, posY);    
    console.log(emoji);
  });

};

main().catch((e) => console.error(e));
