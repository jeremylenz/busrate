import { apiMiddleware } from '../redux/middleware/core/api';
import { SET_LOADER, CLEAR_LOADER } from '../redux/actions/ui';
import { apiRequest, apiSuccess, API_SUCCESS, API_ERROR } from '../redux/actions/api';
import { BUS_ROUTES } from '../redux/actions/busRoutes';
import { wait } from '@testing-library/dom';

const createTestMiddleware = middleware => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  };
  const next = jest.fn();
  const invoke = action => middleware(store)(next)(action);
  return {
    store,
    next,
    invoke
  };
};

beforeAll(fetch.enableMocks);

describe('API Middleware', () => {
  it('passes through non-relevant action', () => {
    const {
      next,
      invoke
    } = createTestMiddleware(apiMiddleware);
    const action = {
      type: 'TEST'
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('dispatches SET_LOADER on request actions', () => {
    fetch.mockResponse(JSON.stringify([]));
    const { next, invoke } = createTestMiddleware(apiMiddleware);
    const action = apiRequest({ url: 'fake.com', method: 'GET', feature: BUS_ROUTES });
    invoke(action);
    expect(next).toHaveBeenCalledWith({
      meta: {
        feature: BUS_ROUTES
      },
      payload: true,
      type: `${BUS_ROUTES} ${SET_LOADER}`
    });
  });
  it('calls fetch for request actions', () => {
    fetch.mockResponse(JSON.stringify([]));
    const { invoke } = createTestMiddleware(apiMiddleware);
    const action = apiRequest({ url: 'fake.com', method: 'GET', feature: BUS_ROUTES });
    invoke(action);

    expect(fetch).toHaveBeenCalled();
  });
  it('dispatches API_SUCCESS on successful fetch', async () => {
    fetch.mockResponse(JSON.stringify([]));
    const { store, invoke } = createTestMiddleware(apiMiddleware);
    const action = apiRequest({ url: 'fake.com', method: 'GET', feature: BUS_ROUTES });
    invoke(action);
    await wait();
    expect(store.dispatch).toHaveBeenCalledWith({
      meta: {
        feature: BUS_ROUTES
      },
      payload: [],
      type: `${BUS_ROUTES} ${API_SUCCESS}`
    });
  });
  it('dispatches API_ERROR on failed fetch', async () => {
    fetch.mockReject('mock error');
    const { store, invoke } = createTestMiddleware(apiMiddleware);
    const action = apiRequest({ url: 'fake.com', method: 'GET', feature: BUS_ROUTES });
    invoke(action);
    await wait();
    expect(store.dispatch).toHaveBeenCalledWith({
      meta: {
        feature: BUS_ROUTES
      },
      payload: 'mock error',
      type: `${BUS_ROUTES} ${API_ERROR}`
    });
  });
  it('dispatches CLEAR_LOADER action on success or error', async () => {
    fetch.mockResponse(JSON.stringify([]));
    const { invoke, next } = createTestMiddleware(apiMiddleware);
    const action = apiSuccess({ response: [], feature: BUS_ROUTES });
    invoke(action);
    await wait();

    expect(next).toHaveBeenCalledWith({
      meta: {
        feature: BUS_ROUTES
      },
      payload: false,
      type: `${BUS_ROUTES} ${CLEAR_LOADER}`
    });
  });
});
