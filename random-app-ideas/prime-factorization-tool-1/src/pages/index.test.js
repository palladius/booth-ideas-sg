import { test } from 'uvu';
import * as assert from 'uvu/assert';

function primeFactorize(num) {
	const factors = [];
	let divisor = 2;

	while (num >= 2) {
		if (num % divisor === 0) {
			factors.push(divisor);
			num = num / divisor;
		} else {
			divisor++;
		}
	}
	return factors;
}

test('primeFactorize', () => {
	assert.equal(primeFactorize(2), [2]);
	assert.equal(primeFactorize(3), [3]);
	assert.equal(primeFactorize(4), [2, 2]);
	assert.equal(primeFactorize(6), [2, 3]);
	assert.equal(primeFactorize(8), [2, 2, 2]);
	assert.equal(primeFactorize(9), [3, 3]);
	assert.equal(primeFactorize(12), [2, 2, 3]);
	assert.equal(primeFactorize(15), [3, 5]);
	assert.equal(primeFactorize(25), [5, 5]);
	assert.equal(primeFactorize(100), [2, 2, 5, 5]);
});

test.run();