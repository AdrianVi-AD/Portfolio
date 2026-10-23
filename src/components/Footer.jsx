export default function Footer() {
  return (
    <footer className="site-footer page-container">
      <p>© {new Date().getFullYear()} Adrian Villacarlos</p>
      <a href="#home">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
