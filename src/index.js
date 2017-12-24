import { render, h, update } from './renderer';
import { createStore } from './store';

const nodes = [];
const links = [];

const store = createStore({
  state: {
    message: 'coucou',
    message2: 'coucou',
    message3: 'coucou',
    isOpen: false,
    updated: false
  },
  actions: {
    updateMessages(state) {
      state.message = 'Autre';
      state.message2 = 'Message 2';
      state.message3 = 'Message 3';
      state.updated = true;
    },
  },
});

const renderApp = () => (
  <div class="buttons">
  {!store.state.updated && 
    <button
      onClick={e => {
        store.actions.updateMessages();
      }}
    >
      Update
    </button>}
    <div style="text-align: center; padding: 20px;">{store.state.message}</div>
    <div style="text-align: center; padding: 20px;">{store.state.message2}</div>
    <div style="text-align: center; padding: 20px;">{store.state.message3}</div>
    <button onClick={() => {
      if (store.state.isOpen) {
        store.state.isOpen = false;
      } else {
        store.state.isOpen = true;
      }
    }}>
      {store.state.isOpen ? "Close": "Open"}
    </button>
    {store.state.isOpen && (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          dignissim turpis vel lectus vulputate, vitae placerat arcu facilisis.
          Donec bibendum rhoncus elit, eu molestie neque tincidunt non. Sed at
          suscipit urna. Sed et lectus enim. Donec a felis mi. Phasellus
          vestibulum ligula id dolor porta consectetur. Donec sed velit at
          sapien pulvinar tempus. Sed lobortis, urna ac malesuada consequat,
          justo risus laoreet leo, ut dictum tellus elit quis magna. Duis auctor
          sit amet leo nec blandit. Nunc libero urna, ullamcorper ac egestas
          eget, elementum convallis nibh. Cras feugiat, mi sit amet pharetra
          auctor, est ex porttitor felis, id venenatis nunc magna eu ipsum. Ut
          sagittis gravida ipsum, in faucibus est sollicitudin ac. Praesent eget
          imperdiet purus. Phasellus orci nunc, interdum a magna vitae,
          convallis suscipit tellus. Aliquam efficitur scelerisque lacus, sed
          ullamcorper eros. In ac vehicula nunc. Suspendisse tincidunt dolor
          nulla, quis dapibus ligula vestibulum vel. Pellentesque ut sem a ex
          fermentum cursus. Curabitur quis risus at ex pretium rutrum. Nam
          tortor ante, tincidunt sit amet porttitor non, vehicula vel sem.
          Phasellus risus felis, suscipit ut nulla sit amet, dignissim pretium
          erat. Aenean porta imperdiet diam vitae vestibulum. Vestibulum non
          velit sit amet dolor cursus blandit. Fusce est velit, blandit at
          ligula eget, suscipit aliquet nisl. Phasellus interdum dui suscipit
          nisi faucibus, eget posuere magna tincidunt. Quisque ut egestas nisl,
          ut interdum dui. Donec sapien dui, vulputate bibendum nibh a, accumsan
          commodo nisi. Nullam vestibulum turpis et pretium ultrices. Vivamus
          porttitor et nulla nec ultrices. Pellentesque blandit nisi nec porta
          congue. Fusce placerat id felis eget sodales. Sed a odio vitae neque
          aliquet tempor vestibulum quis arcu. Proin ut egestas metus. Duis eu
          porta lacus. Aenean varius nibh sit amet erat blandit, sit amet
          volutpat turpis suscipit. Cras mi tellus, ultricies ut elit mattis,
          finibus mollis risus. Proin nec mauris porttitor, placerat eros sed,
          viverra libero. Vestibulum quis accumsan ipsum. Nulla id magna et enim
          sodales aliquam in sit amet mauris. Fusce posuere in turpis ac
          sodales. Nullam finibus lorem justo, ut sollicitudin dui viverra ac.
          Aenean finibus id erat nec luctus. Suspendisse ullamcorper
          pellentesque lacus, id varius lorem luctus et. Proin vulputate
          efficitur justo, eu sollicitudin magna euismod vitae. Curabitur a
          sodales augue, id lacinia sapien. Duis eu congue leo. Nam et justo
          pulvinar, viverra nisi eget, hendrerit odio. Mauris convallis tortor
          ac orci molestie, posuere placerat dui efficitur. Ut elit dui,
          ultrices vitae turpis non, dictum faucibus dui. Cras sit amet lorem eu
          dolor bibendum dignissim. Aliquam et nisi ante. Cras tincidunt mollis
          enim, quis luctus enim semper eu. Nulla non massa sollicitudin,
          molestie felis nec, fringilla lacus. Ut purus nunc, consequat semper
          mattis quis, pellentesque id lacus. Nunc porttitor sem nisi. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    )}
  </div>
);

console.time('render');
render(renderApp(), 'root');
console.timeEnd('render');
store.listen(() => {
  console.time('update');
  render(renderApp(), 'root');
  console.timeEnd('update');
});
