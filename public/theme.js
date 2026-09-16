// shubham.lol theme toggle. Load in <head> so the stored choice applies before paint.
// One source of truth: the .dark class on <html>. localStorage.theme = 'dark' | 'light'.
(function(){try{var t=localStorage.theme;if(t==='dark')document.documentElement.classList.add('dark');if(t==='light')document.documentElement.classList.add('light')}catch(e){}
window.toggleTheme=function(){var el=document.documentElement,d=!el.classList.contains('dark');el.classList.toggle('dark',d);el.classList.toggle('light',!d);try{localStorage.theme=d?'dark':'light'}catch(e){}}})();
