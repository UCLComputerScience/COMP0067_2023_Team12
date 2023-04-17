import IndividualProjectPage from './IndividualProjectPage';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';

// Defines the project data used for testing
const project = {
  id: 1,
  title: 'Test Project',
  groupMembers: 'Test Group Members',
  supervisors: 'Test Supervisors',
  description: 'Test Description',
  videoLink: 'Test Video Link',
  images: ['image1.jpg', 'image2.jpg'],
  bannerImage: ['banner.jpg'],
  category: 'Test Category',
  tags: ['tag1', 'tag2'],
  popularity: 0,
  placement: 'None',
  published: true,
};

// MSW (Mock Service Worker) is used to set up a server to mock API requests.
const mockserver = setupServer(
  rest.get('http://localhost:8080/api/projects/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id,
        ...project,
      }),
    );
  }),
);

beforeAll(() => mockserver.listen());
afterEach(() => mockserver.resetHandlers());
afterAll(() => mockserver.close());

describe('Integration Tesing: IndividualProjectPage', () => {
  test('ProjectDetail component test', async () => {
    render(
      <BrowserRouter>
        <IndividualProjectPage projectId={project.id} />
      </BrowserRouter>,
      { initialState: { project } }
    );

    await screen.findByText(project.title);

    // Verify that the project title is displayed correctly
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});