import { formatDate } from './utils';

describe('formatDate', () => {
  it('returns empty string for no names defined', () => {
    expect(formatDate(undefined, undefined, undefined)).toEqual('');
  });

  it('formats just first names', () => {
    expect(formatDate('Joseph', undefined, undefined)).toEqual('Joseph');
  });

  it('formats first and last names', () => {
    expect(formatDate('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });

  it('formats first, middle and last names', () => {
    expect(formatDate('Joseph', 'Quincy', 'Publique')).toEqual(
      'Joseph Quincy Publique'
    );
  });
});
