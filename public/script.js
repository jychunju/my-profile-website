const toggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
function closeMenu() {
  if (!toggle || !mobileMenu) return;
  mobileMenu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '메뉴 열기');
}
toggle?.addEventListener('click', () => {
  mobileMenu.hidden = !mobileMenu.hidden;
  toggle.setAttribute('aria-expanded', String(!mobileMenu.hidden));
  toggle.setAttribute('aria-label', mobileMenu.hidden ? '메뉴 열기' : '메뉴 닫기');
});
mobileMenu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) { closeMenu(); toggle.focus(); } });
window.matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const navLinks = document.querySelectorAll('[data-path]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    navLinks.forEach(link => {
      const selected = link.dataset.path === active.target.id;
      link.classList.toggle('text-primary', selected);
      link.classList.toggle('font-bold', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-90px 0px -45% 0px', threshold: [0, 0.1, 0.5] });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
document.getElementById('copyEmailBtn')?.addEventListener('click', async () => {
  const label = document.getElementById('copyLabel');
  try {
    await navigator.clipboard.writeText('hong@example.com');
    label.textContent = '복사 완료';
  } catch {
    label.textContent = '복사 불가';
  }
  setTimeout(() => { label.textContent = '복사'; }, 2500);
});
document.getElementById('portfolioContactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const type = document.getElementById('projectType').selectedOptions[0].textContent;
  const message = document.getElementById('userMessage').value.trim();
  const body = `이름: ${name}\n이메일: ${email}\n문의 유형: ${type}\n\n${message}`;
  window.location.href = `mailto:hong@example.com?subject=${encodeURIComponent(`[프로필 문의] ${type}`)}&body=${encodeURIComponent(body)}`;
  document.getElementById('formStatus').textContent = '메일 앱에서 내용을 확인하고 직접 전송해 주세요. 기본 메일 앱 설정이 필요합니다.';
});
