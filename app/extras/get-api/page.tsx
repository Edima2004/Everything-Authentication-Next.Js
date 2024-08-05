"use client";
import React,{useState} from 'react'
import { Button } from '@/components/ui/button';

const GetApi = () => {
	const [challenge, setChallenge] = useState<Challenge>();

	interface Challenge {
		challenger: string;
		encrypted_path: string;
		encryption_method: string;
		expires_in: string;
		hint: string;
		instructions: string;
		level: number;
	}

	// Decode the Base64 encoded string

	function decodeBase64(encodedStr: string): string {
		const decodedBytes = Buffer.from(encodedStr, 'base64');
		return decodedBytes.toString('utf-8');
	}

	//fetch data
	async function fetchEndpoint(path: string): Promise<Challenge> {
		const response = await fetch(path);
		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`Failed to fetch endpoint: ${response.status}`);
		}
	}

	async function solveChallenge(challenge: Challenge): Promise<void> {
		// Step 1: Decode the encrypted_path
		const encryptedPath = challenge.encrypted_path;
		const encryptionMethod = challenge.encryption_method;

		let decodedPath: string;
		if (encryptionMethod === 'encoded as base64') {
			decodedPath = decodeBase64(encryptedPath);
			console.log(`Decoded Path: ${decodedPath}`);
		} else {
			throw new Error(`Unknown encryption method: ${encryptionMethod}`);
		}

		// Step 2: Fetch the next challenge
		const nextChallenge = await fetchEndpoint(decodedPath);
		console.log(`Next Challenge: ${JSON.stringify(nextChallenge, null, 2)}`);

		// If there are further instructions, handle them here
		if (
			'encrypted_path' in nextChallenge &&
			'encryption_method' in nextChallenge
		) {
			await solveChallenge(nextChallenge);
		} else {
			console.log('Final Challenge Solved');
		}
	}

	(async () => {
		// Initial challenge
		const challenge: Challenge = {
			challenger: 'edimavthompson@gmail.com',
			encrypted_path: 'task_NGJiNmI1ZjEzMjRlNmViZDcxMWE1MTdiM2U3ZDcwMGQ=',
			encryption_method: 'encoded as base64',
			expires_in: '15s',
			hint: 'you should write a program to fetch these endpoints and handle each encryption method you find.',
			instructions:
				'encrypted_path is the path to your next challenge. encryption_method is how it was encrypted.',
			level: 1,
		};

		const startTime = Date.now();
		setChallenge(challenge);
		await solveChallenge(challenge);
		const elapsedTime = (Date.now() - startTime) / 1000;
		if (elapsedTime > 15) {
			console.log('Challenge expired');
		} else {
			console.log(`Challenge solved in ${elapsedTime.toFixed(2)} seconds`);
		}
	})();

	const onSubmit = async () => {
		await solveChallenge(challenge as Challenge);
	};
	return (
		<>
			<Button onClick={onSubmit}>Run Challenge</Button>
		</>
	);
};
export default GetApi;
