import { TicketsRoutingModule } from './tickets-routing.module';

describe('TicketsRoutingModule', () => {
  let ticketsRoutingModule: TicketsRoutingModule;

  beforeEach(() => {
    ticketsRoutingModule = new TicketsRoutingModule();
  });

  it('should create an instance', () => {
    expect(ticketsRoutingModule).toBeTruthy();
  });
});
