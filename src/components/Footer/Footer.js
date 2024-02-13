import Container from '../Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6">
        <p className="text-center text-slate-500">
          Built with <a className="underline font-medium text-inherit" href="https://react.dev/">React</a> with <a className="underline font-medium text-inherit" href="#">love</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;