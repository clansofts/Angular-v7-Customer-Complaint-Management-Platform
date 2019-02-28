import { TicketsManagementRoutingModule } from './ticket-management-routing.module';

describe('TicketsRoutingModule', () => {
  let ticketsRoutingModule: TicketsManagementRoutingModule;

  beforeEach(() => {
    ticketsRoutingModule = new TicketsManagementRoutingModule();
  });

  it('should create an instance', () => {
    expect(ticketsRoutingModule).toBeTruthy();
  });
});
