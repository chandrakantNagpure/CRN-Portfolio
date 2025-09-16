import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithContexts, userEvent, waitFor } from '../../test/utils';
import StatusIndicator from '../StatusIndicator';

// Mock the TechContext and StatusContext
vi.mock('../TechContext', () => ({
  useTech: () => ({
    bgColor: '#61DAFB',
  }),
}));

vi.mock('../../contexts/StatusContext', () => ({
  useStatus: () => ({
    status: 'available',
    lastUpdated: '2024-01-01T00:00:00.000Z',
    updateStatus: vi.fn(),
    statusConfig: {
      available: {
        color: '#10B981',
        icon: '🟢',
        text: 'Available',
        description: 'Ready to work on new projects',
        bgColor: '#F0FDF4',
      },
      busy: {
        color: '#F59E0B',
        icon: '🟡',
        text: 'Busy',
        description: 'Currently working on projects',
        bgColor: '#FFFBEB',
      },
      away: {
        color: '#EF4444',
        icon: '🔴',
        text: 'Away',
        description: 'Not available at the moment',
        bgColor: '#FEF2F2',
      },
    },
  }),
  getTimeAgo: vi.fn(() => '1 hour ago'),
}));

vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: vi.fn(key => {
      const translations = {
        'status.available': 'Available',
        'status.busy': 'Busy',
        'status.away': 'Away',
        'status.descriptions.available': 'Ready to work on new projects',
        'status.descriptions.busy': 'Currently working on projects',
        'status.descriptions.away': 'Not available at the moment',
        'status.lastUpdated': 'Last updated',
      };
      return translations[key] || key;
    }),
  }),
}));

describe('StatusIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the status indicator with correct status', () => {
    const { getByText } = renderWithContexts(<StatusIndicator />);

    expect(getByText('Available')).toBeInTheDocument();
  });

  it('shows status indicator dot with correct color', () => {
    const { container } = renderWithContexts(<StatusIndicator />);

    const statusDot = container.querySelector('[style*="background-color: rgb(16, 185, 129)"]');
    expect(statusDot).toBeInTheDocument();
  });

  it('expands to show details when clicked', async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = renderWithContexts(<StatusIndicator />);

    // Initially, detailed description should not be visible
    expect(queryByText('Ready to work on new projects')).not.toBeInTheDocument();

    // Click to expand
    await user.click(getByText('Available'));

    // Now detailed description should be visible
    await waitFor(() => {
      expect(getByText('Ready to work on new projects')).toBeInTheDocument();
    });
  });

  it('shows manual controls when showManualControls is true', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContexts(<StatusIndicator showManualControls={true} />);

    // Click to expand
    await user.click(getByText('Available'));

    await waitFor(() => {
      expect(getByText('Update Status:')).toBeInTheDocument();
    });
  });

  it('does not show manual controls by default', async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = renderWithContexts(<StatusIndicator />);

    // Click to expand
    await user.click(getByText('Available'));

    await waitFor(() => {
      expect(queryByText('Update Status:')).not.toBeInTheDocument();
    });
  });

  it('applies custom className when provided', () => {
    const { container } = renderWithContexts(<StatusIndicator className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses sidebar colors when useSidebarColors prop is true', () => {
    const { getByText } = renderWithContexts(<StatusIndicator useSidebarColors={true} />);

    const statusText = getByText('Available');
    expect(statusText).toHaveStyle({ color: 'currentColor' });
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContexts(<StatusIndicator />);

    const statusIndicator =
      getByText('Available').closest('[role="region"]') || getByText('Available').parentElement;

    // Focus and press Enter
    statusIndicator.focus();
    await user.keyboard('{Enter}');

    // Should expand and show description
    await waitFor(() => {
      expect(getByText('Ready to work on new projects')).toBeInTheDocument();
    });
  });

  it('displays last updated time', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContexts(<StatusIndicator />);

    // Click to expand
    await user.click(getByText('Available'));

    await waitFor(() => {
      expect(getByText('Last updated 1 hour ago')).toBeInTheDocument();
    });
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = renderWithContexts(
      <div>
        <StatusIndicator />
        <button>Outside button</button>
      </div>
    );

    // Click to expand
    await user.click(getByText('Available'));

    await waitFor(() => {
      expect(getByText('Ready to work on new projects')).toBeInTheDocument();
    });

    // Click outside
    await user.click(getByText('Outside button'));

    await waitFor(() => {
      expect(queryByText('Ready to work on new projects')).not.toBeInTheDocument();
    });
  });
});
