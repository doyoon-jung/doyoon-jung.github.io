(function(){
      const btn = document.querySelector('.nav-toggle');
      const menu = document.querySelector('.navlinks');
      if(!btn || !menu) return;
      btn.addEventListener('click', (e)=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(menu.classList.contains('open')){
          menu.style.display = 'none';
          menu.classList.remove('open');
        } else {
          // show as a column popup on mobile
          menu.style.display = 'flex';
          menu.style.flexDirection = 'column';
          menu.style.position = 'absolute';
          menu.style.right = '18px';
          menu.style.top = '64px';
          menu.style.background = '#fff';
          menu.style.padding = '10px';
          menu.style.borderRadius = '8px';
          menu.style.boxShadow = '0 8px 20px rgba(10,20,40,0.08)';
          menu.classList.add('open');
        }
      });

      // close when clicking outside
      document.addEventListener('click', (e)=>{
        if(!btn.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('open')){
          menu.style.display = 'none';
          menu.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        }
      });
    })();

    // Back to top & smooth scroll
    (function(){
      const btt = document.querySelector('.back-to-top');
      if(!btt) return;
      window.addEventListener('scroll', ()=>{
        if(window.pageYOffset > 300) btt.style.display = 'block'; else btt.style.display = 'none';
      });
      btt.addEventListener('click', ()=>{
        window.scrollTo({top:0,behavior:'smooth'});
      });

      // smooth scroll for internal links
      document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', (e)=>{
          const href = a.getAttribute('href');
          if(href.length>1){
            const el = document.querySelector(href);
            if(el){
              e.preventDefault();
              const top = el.getBoundingClientRect().top + window.pageYOffset - 72; // account for nav
              window.scrollTo({top,behavior:'smooth'});
              // close mobile menu if open
              const menu = document.querySelector('.navlinks');
              const btn = document.querySelector('.nav-toggle');
              if(menu && menu.classList.contains('open')){
                menu.style.display='none'; menu.classList.remove('open'); if(btn) btn.setAttribute('aria-expanded','false');
              }
            }
          }
        })
      });
    })();