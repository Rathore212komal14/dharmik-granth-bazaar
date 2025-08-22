
    // Product data — you can edit or fetch from server
    const PRODUCTS = [
      {id: 'geeta', title: 'Bhagavad Gita (With Hindi Commentary)', devta: 'Krishna', meta: 'Gita — 700 shlok', price: 699, desc: 'Shreemad Bhagavad Gita with Hindi commentary, compact edition for daily paath.', img: 'https://wonderhousebooks.com/cache/public/uploads/books/20240718095337_15.jpg-549x611.jpg'},
      {id: 'bhagavat', title: 'Shrimad Bhagavatam (Select)', devta: 'Krishna', meta: 'Puran', price: 499, desc: 'Selected khand of Bhagavatam — Krishna leela aur updesh.', img: 'https://cdn.quicksell.co/-N4vSkfqC5GwdHr1A5dK/products/-NgTrAd22EKlIy1Ajl5W.jpg'},
      {id: 'ramayan', title: 'Valmiki Ramayana (Hindi)', devta: 'Ram', meta: 'Ramayan — Valmiki', price: 299, desc: 'Original Valmiki Ramayan — simple Hindi translation.', img: 'https://iskcontsp.org/wp-content/uploads/2023/01/Ramayan-hardcover-front-scaled.jpg'},
      {id: 'ramcharit', title: 'Ramcharitmanas (Tulsidas)', devta: 'Ram', meta: 'Tulsidas', price: 199, desc: 'Goswami Tulsidas ki Ramkatha — chhapa hua sankshipt edition.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAXelzb_x15CfifoOXXrO_Nk29I4WAkEztw&s'},
      {id: 'shiva', title: 'Shiv Purana (Select)', devta: 'Shiv', meta: 'Purana', price: 349, desc: 'Shiv ji ke mahatmya, Stuti aur Puranik kathaon ka sankalan.', img: 'https://images.meesho.com/images/products/433193415/kk4of_512.webp?width=512'},
      {id: 'shivtandav', title: 'Shiv Tandav Stotram (With Meaning)', devta: 'Shiv', meta: 'Stotram', price: 299, desc: 'Ravana ki rachna — Shiv ji ke tandav ka prachand stotram.', img: 'https://m.media-amazon.com/images/I/91SjhXX+ddL._UF1000,1000_QL80_.jpg'},
      {id: 'hanuman', title: 'Hanuman Chalisa + Bajrang Baan', devta: 'Hanuman', meta: 'Stuti & Raksha', price: 149, desc: 'Hanuman Chalisa aur Bajrang Baan ek saath — pocket edition.', img: 'https://www.asthabooks.com/cdn/shop/files/m223.jpg?v=1692004333&width=823'},
      {id: 'ganeshpurana', title: 'ganeshpurana', devta: 'Ganesh', meta: 'Puran', price: 399, desc: 'Shri Ganesh Puran with stories of Ganesh ji, vrat kathayein aur updesh.', img: 'https://m.media-amazon.com/images/I/61W+39E9HjL._UF1000,1000_QL80_.jpg'},
      {id: 'vishnupuran', title:'Vishnu Puran (Select)', devta: 'Vishnu', meta: 'Puran', price: 599, desc:'Selected khand of Vishnu Puran — Bhagwan Vishnu ke avtaar aur leelaon ka sangrah.', img: 'https://cdn.exoticindia.com/images/products/original/books/haa767.jpg'},
      {id: 'durga', title: 'Durga Saptashati (Devi Mahatmyam)', devta: 'Durga', meta: 'Devi Purana', price: 249, desc: 'Navratri aur Diwali ke liye pavitra path — Devi ka mahatva.', img: 'https://www.greatepujari.com/cdn/shop/products/IMG20230105173356.jpg?v=1672921832'}
    ];

    // --- Render products ---
    const productsEl = document.getElementById('products');
    const tpl = document.getElementById('productTpl');

    function money(n){return '₹'+n.toFixed(0)}

    function renderProducts(list){
      productsEl.innerHTML='';
      list.forEach(p=>{
        const node = tpl.content.cloneNode(true);
        node.querySelector('[data-bg]').style.backgroundImage = `url(${p.img})`;
        node.querySelector('[data-title]').textContent = p.title;
        node.querySelector('[data-meta]').textContent = p.devta + ' • ' + p.meta;
        node.querySelector('[data-desc]').textContent = p.desc;
        node.querySelector('[data-price]').textContent = money(p.price);
        node.querySelector('[data-buy]').addEventListener('click', ()=> addToCart(p.id));
        node.querySelector('[data-view]').addEventListener('click', ()=> alert(p.title +"\n\n"+ p.desc +"\n\nPrice: "+ money(p.price)));
        productsEl.appendChild(node);
      })
    }

    // --- Cart logic ---
    let cart = {}; // id -> qty
    const cartList = document.getElementById('cartList');
    const cartCount = document.getElementById('cartCount');
    const totalPriceEl = document.getElementById('totalPrice');

    function addToCart(id){
      cart[id] = (cart[id]||0) + 1;
      renderCart();
    }

    function removeFromCart(id){
      delete cart[id];
      renderCart();
    }

    function changeQty(id, delta){
      cart[id] = (cart[id]||0) + delta;
      if(cart[id] <= 0) delete cart[id];
      renderCart();
    }

    function renderCart(){
      cartList.innerHTML='';
      const keys = Object.keys(cart);
      let total = 0;
      keys.forEach(id=>{
        const p = PRODUCTS.find(x=>x.id===id);
        const qty = cart[id];
        total += p.price * qty;
        const div = document.createElement('div');
        div.className='cart-item';
        div.innerHTML = `
          <div style="flex:1">
            <div style="font-weight:700">${p.title}</div>
            <div class="muted" style="font-size:13px">${p.devta} • ${money(p.price)} x ${qty}</div>
          </div>
          <div class="qty">
            <button class="btn ghost" data-id="${id}" data-action="dec">-</button>
            <div style="min-width:22px;text-align:center">${qty}</div>
            <button class="btn ghost" data-id="${id}" data-action="inc">+</button>
            <button class="btn ghost" data-id="${id}" data-action="del">Del</button>
          </div>
        `;
        cartList.appendChild(div);
      })
      cartCount.textContent = keys.length;
      totalPriceEl.textContent = money(total);

      // attach listeners
      cartList.querySelectorAll('button[data-action]').forEach(b=>{
        b.addEventListener('click', ()=>{
          const id = b.getAttribute('data-id');
          const a = b.getAttribute('data-action');
          if(a==='dec') changeQty(id,-1);
          if(a==='inc') changeQty(id,1);
          if(a==='del') removeFromCart(id);
        })
      })

      // update pay button
      document.getElementById('payNow').textContent = 'Pay ' + money(total);
    }

    // --- Search & Reset ---
    document.getElementById('search').addEventListener('input', (e)=>{
      const q = e.target.value.trim().toLowerCase();
      renderProducts(PRODUCTS.filter(p=> (p.title+p.devta+p.meta+p.desc).toLowerCase().includes(q)));
    })
    document.getElementById('clearBtn').addEventListener('click', ()=>{
      document.getElementById('search').value='';
      renderProducts(PRODUCTS);
    })

    // --- Checkout modal ---
    const modal = document.getElementById('modal');
    function openModal(){
      const keys = Object.keys(cart);
      const body = document.getElementById('modalBody');
      body.innerHTML='';
      if(keys.length===0){ body.innerHTML = '<div class="muted">Cart is empty. Add books to proceed.</div>'; }
      let total = 0;
      keys.forEach(id=>{
        const p = PRODUCTS.find(x=>x.id===id);
        const qty = cart[id];
        total += p.price * qty;
        const el = document.createElement('div');
        el.style.marginBottom='8px';
        el.innerHTML = `<div style="display:flex;justify-content:space-between"><div>${p.title} × ${qty}</div><div>${money(p.price*qty)}</div></div>`;
        body.appendChild(el);
      })
      document.getElementById('payNow').textContent = 'Pay ' + money(total);
      document.getElementById('modalTitle').textContent = 'Order Summary — ' + keys.length + ' items';
      modal.style.display='flex';
    }
    function closeModal(){modal.style.display='none'}

    document.getElementById('checkoutBtn').addEventListener('click', openModal);
    document.getElementById('checkoutSideBtn').addEventListener('click', openModal);
    document.getElementById('clearCart').addEventListener('click', ()=>{cart={};renderCart();});

    // --- Simulate payment ---
    document.getElementById('payNow').addEventListener('click', ()=>{
      const name = document.getElementById('nameInput').value.trim();
      if(!name){ alert('Please enter receiver name before paying.'); return; }
      const keys = Object.keys(cart);
      if(keys.length===0){ alert('Cart is empty.'); return; }
      // simulate success
      const order = { id: 'ORD'+Math.floor(Math.random()*90000+10000), name, items: keys.map(id=>({id, qty:cart[id]})), total: Array.from(keys).reduce((s,id)=> s + (PRODUCTS.find(p=>p.id===id).price * cart[id]), 0)};
      closeModal();
      cart={}; renderCart();
      setTimeout(()=>{
        alert('Payment successful!\nOrder ID: '+order.id+'\nTotal: ₹'+order.total+'\nWe will contact you on order details.');
      },400);
    })

    // initial render
    renderProducts(PRODUCTS);
    renderCart();

    // helper: close modal on outside click
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
