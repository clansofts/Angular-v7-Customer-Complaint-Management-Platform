import { CustomerModule } from './customer.module';

describe('DashboardModule', () => {
  let dashboardModule: CustomerModule;

  beforeEach(() => {
    dashboardModule = new CustomerModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
