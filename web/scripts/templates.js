const content = document.querySelector(".content");

const home = () => `
<section class="data">
          <label for="Browser">Browser</label>
          <input
            type="text"
            class="browser"
            placeholder="Chrome, Edge or Firefox"
            id="Browser"
          />
          <label for="Phone">Phone</label>
          <input
            type="text"
            class="phone"
            placeholder="E.g, +64468487982"
            id="Phone"
          />
        </section>
        <section class="modes">
          <div class="modes__random">
            <span class="modes__random--status">OFF</span>
            <button class="modes__random--activate">Random Mode</button>
          </div>
          <div class="modes__scheduled">
            <span class="modes__scheduled--status">OFF</span>
            <button class="modes__scheduled--activate">Scheduled Mode</button>
          </div>
        </section>
        <button class="start">Start Bot</button>
      </section>
`;
