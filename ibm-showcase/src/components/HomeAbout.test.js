import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeAbout from  './HomeAbout';

it('displays the heading', () => {
    render(
    <Router>
      <HomeAbout />
    </Router>
    );
    expect(
        screen.getByRole('heading', { name: /About/i } )
      ).toBeInTheDocument()
  })
it('displays the About', () => {
  render(
  <Router>
    <HomeAbout />
  </Router>
  );
  const AboutDescription = screen.getByText(
    /IBM and UCL have collaborated on various projects over the years. From Artificial Intelligence to Healthcare - pushing the boundaries of innovation. Learn more about our story./i
  );
  expect(AboutDescription).toBeInTheDocument()
})
it('displays the get started button', () => {
  render(
    <Router>
      <HomeAbout />
    </Router>
    );

  expect(
    screen.getByRole('button', { name: /Read More/i })
  ).toBeInTheDocument()
})