import { TicketManagementModule } from './ticket-management.module';

describe('TicketManagementModule', () => {
  let ticketManagementModule: TicketManagementModule;

  beforeEach(() => {
    ticketManagementModule = new TicketManagementModule();
  });

  it('should create an instance', () => {
    expect(ticketManagementModule).toBeTruthy();
  });
});
