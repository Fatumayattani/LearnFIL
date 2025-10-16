import type { Module, Lesson } from '../lib/supabase';

export const SEED_MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'Understanding CIDs',
    description: 'Learn about Content Identifiers (CIDs) and how they work in Filecoin',
    order_index: 1,
    icon: 'Hash',
    estimated_minutes: 45,
    created_at: new Date().toISOString()
  },
  {
    id: 'module-2',
    title: 'IPFS Basics',
    description: 'Master the InterPlanetary File System and its role in Filecoin',
    order_index: 2,
    icon: 'Network',
    estimated_minutes: 60,
    created_at: new Date().toISOString()
  },
  {
    id: 'module-3',
    title: 'Smart Contracts',
    description: 'Build and deploy smart contracts on the Filecoin Virtual Machine',
    order_index: 3,
    icon: 'Code',
    estimated_minutes: 90,
    created_at: new Date().toISOString()
  },
  {
    id: 'module-4',
    title: 'Storage Deals',
    description: 'Learn how to create and manage storage deals on Filecoin',
    order_index: 4,
    icon: 'Database',
    estimated_minutes: 75,
    created_at: new Date().toISOString()
  },
  {
    id: 'module-5',
    title: 'Retrieval Markets',
    description: 'Understand how data retrieval works in the Filecoin network',
    order_index: 5,
    icon: 'Download',
    estimated_minutes: 60,
    created_at: new Date().toISOString()
  },
  {
    id: 'module-6',
    title: 'Advanced Topics',
    description: 'Explore advanced Filecoin development patterns and best practices',
    order_index: 6,
    icon: 'Sparkles',
    estimated_minutes: 120,
    created_at: new Date().toISOString()
  }
];

export const SEED_LESSONS: Lesson[] = [
  {
    id: 'lesson-1-1',
    module_id: 'module-1',
    title: 'What is a CID?',
    content: `## Introduction to Content Identifiers

Content Identifiers (CIDs) are self-describing content-addressed identifiers used in IPFS and Filecoin. They are the fundamental building block for addressing data in a decentralized system.

## Key Concepts

**Content Addressing** - Unlike traditional location-based addressing (URLs), content addressing uses the content itself to generate a unique identifier.

**Cryptographic Hashing** - CIDs use cryptographic hash functions to generate unique fingerprints of content.

**Self-Describing** - CIDs contain information about how the content was hashed and formatted.

## Why CIDs Matter

- **Verifiability**: You can verify the content matches the CID
- **Deduplication**: Identical content always produces the same CID
- **Permanent Links**: Content can be moved without breaking links

## CID Structure

A CID consists of:
- Version (CIDv0 or CIDv1)
- Codec (how the content is encoded)
- Multihash (the hash function and the actual hash)

\`bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi\``,
    order_index: 1,
    starter_code: `// Function to check if a string is a valid CID
function isValidCID(str) {
  // TODO: Implement CID validation
  // CIDs start with 'Qm' (v0) or 'bafy' (v1)

  return false;
}

// Test your function
console.log(isValidCID('QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'));
console.log(isValidCID('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'));
console.log(isValidCID('not-a-cid'));`,
    solution_code: `function isValidCID(str) {
  if (typeof str !== 'string') return false;

  // Check for CIDv0 (starts with Qm and 46 chars)
  if (str.startsWith('Qm') && str.length === 46) {
    return true;
  }

  // Check for CIDv1 (starts with bafy or other multibase prefix)
  if (str.startsWith('bafy') || str.startsWith('bafk')) {
    return str.length > 10;
  }

  return false;
}

console.log(isValidCID('QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'));
console.log(isValidCID('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'));
console.log(isValidCID('not-a-cid'));`,
    validation_tests: [
      {
        description: 'Should return true for valid CIDv0',
        test: "isValidCID('QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG') === true"
      },
      {
        description: 'Should return true for valid CIDv1',
        test: "isValidCID('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi') === true"
      },
      {
        description: 'Should return false for invalid string',
        test: "isValidCID('not-a-cid') === false"
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-1-2',
    module_id: 'module-1',
    title: 'Creating CIDs',
    content: `## Generating Content Identifiers

In this lesson, you'll learn how to generate CIDs from content. While real implementations use cryptographic libraries, we'll simulate the process to understand the concepts.

## The Process

**1. Content Input** - Start with any data (text, file, etc.)

**2. Hash Generation** - Apply a cryptographic hash function (like SHA-256)

**3. Multihash Creation** - Prepend hash metadata

**4. CID Construction** - Add version and codec information

## Hash Functions

Common hash functions used in CIDs:
- SHA-256 (most common)
- SHA-512
- BLAKE2b

## Example

For the text "Hello, Filecoin!":
1. Hash the content → generates a digest
2. Create multihash → adds hash function info
3. Build CID → adds version and codec

The result is a unique, verifiable identifier!`,
    order_index: 2,
    starter_code: `// Simulate CID generation (simplified)
function generateSimpleCID(content) {
  // TODO: Create a simple hash of the content
  // Hint: Use a basic string hash and prepend 'bafy'

  return '';
}

// Test your function
const cid1 = generateSimpleCID('Hello, Filecoin!');
const cid2 = generateSimpleCID('Hello, Filecoin!');
const cid3 = generateSimpleCID('Different content');

console.log('CID 1:', cid1);
console.log('CID 2:', cid2);
console.log('Same content produces same CID:', cid1 === cid2);
console.log('Different content produces different CID:', cid1 !== cid3);`,
    solution_code: `function generateSimpleCID(content) {
  // Simple hash function (for educational purposes only)
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // Convert to base36 and prepend 'bafy' prefix
  const hashStr = Math.abs(hash).toString(36);
  return 'bafy' + hashStr.padStart(40, '0');
}

const cid1 = generateSimpleCID('Hello, Filecoin!');
const cid2 = generateSimpleCID('Hello, Filecoin!');
const cid3 = generateSimpleCID('Different content');

console.log('CID 1:', cid1);
console.log('CID 2:', cid2);
console.log('Same content produces same CID:', cid1 === cid2);
console.log('Different content produces different CID:', cid1 !== cid3);`,
    validation_tests: [
      {
        description: 'Should return a string starting with bafy',
        test: "generateSimpleCID('test').startsWith('bafy')"
      },
      {
        description: 'Same content should produce same CID',
        test: "generateSimpleCID('Hello') === generateSimpleCID('Hello')"
      },
      {
        description: 'Different content should produce different CID',
        test: "generateSimpleCID('Hello') !== generateSimpleCID('World')"
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-2-1',
    module_id: 'module-2',
    title: 'IPFS Architecture',
    content: `## Understanding IPFS

The InterPlanetary File System (IPFS) is a peer-to-peer hypermedia protocol designed to make the web faster, safer, and more open.

## Core Components

**Distributed Hash Table (DHT)** - Helps nodes find content across the network

**BitSwap** - Data exchange protocol for trading blocks of data

**Merkle DAG** - Data structure for organizing content

**Libp2p** - Modular networking stack

## How IPFS Works

**1. Content Addressing** - Files are identified by their content hash (CID)

**2. Content Discovery** - DHT helps locate which peers have the content

**3. Content Retrieval** - BitSwap negotiates data transfer

**4. Local Caching** - Retrieved content is cached locally

## Benefits

- Permanent storage of content
- Efficient content distribution
- Offline-first capabilities
- Censorship resistance`,
    order_index: 1,
    starter_code: `// Simulate IPFS content discovery
function findContentProviders(cid, peerList) {
  // TODO: Find which peers have the content
  // Return array of peer IDs that have this CID

  return [];
}

// Test data
const peers = [
  { id: 'peer1', content: ['bafy123', 'bafy456'] },
  { id: 'peer2', content: ['bafy789', 'bafy123'] },
  { id: 'peer3', content: ['bafy456'] }
];

console.log('Peers with bafy123:', findContentProviders('bafy123', peers));
console.log('Peers with bafy456:', findContentProviders('bafy456', peers));`,
    solution_code: `function findContentProviders(cid, peerList) {
  return peerList
    .filter(peer => peer.content.includes(cid))
    .map(peer => peer.id);
}

const peers = [
  { id: 'peer1', content: ['bafy123', 'bafy456'] },
  { id: 'peer2', content: ['bafy789', 'bafy123'] },
  { id: 'peer3', content: ['bafy456'] }
];

console.log('Peers with bafy123:', findContentProviders('bafy123', peers));
console.log('Peers with bafy456:', findContentProviders('bafy456', peers));`,
    validation_tests: [
      {
        description: 'Should find peers with the content',
        test: "findContentProviders('bafy123', [{id:'p1',content:['bafy123']}]).includes('p1')"
      },
      {
        description: 'Should return empty array if no peers have content',
        test: "findContentProviders('bafy999', [{id:'p1',content:['bafy123']}]).length === 0"
      },
      {
        description: 'Should find multiple peers',
        test: "findContentProviders('bafy123', [{id:'p1',content:['bafy123']},{id:'p2',content:['bafy123']}]).length === 2"
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-3-1',
    module_id: 'module-3',
    title: 'FVM Introduction',
    content: `## Filecoin Virtual Machine

The Filecoin Virtual Machine (FVM) enables smart contracts on the Filecoin network, bringing programmability to decentralized storage.

## Key Features

**EVM Compatibility** - Deploy Solidity contracts with minimal changes

**Storage Primitives** - Built-in storage deal functionality

**Data DAOs** - Programmable storage policies

**Cross-chain** - Bridge with other blockchain ecosystems

## Use Cases

- Automated storage deal management
- Decentralized data markets
- Perpetual storage solutions
- NFT storage with proof of replication

## Smart Contract Basics

Smart contracts on FVM can:
- Create and manage storage deals
- Implement custom storage policies
- Handle payments and incentives
- Verify data integrity`,
    order_index: 1,
    starter_code: `// Simple storage contract simulation
class StorageContract {
  constructor() {
    this.deals = [];
  }

  createDeal(clientAddress, storageProvider, size, duration) {
    // TODO: Create a new storage deal
    // Return deal ID

    return null;
  }

  getDeal(dealId) {
    // TODO: Retrieve deal information

    return null;
  }
}

// Test your contract
const contract = new StorageContract();
const dealId = contract.createDeal('client1', 'provider1', 1024, 30);
console.log('Created deal:', dealId);
console.log('Deal info:', contract.getDeal(dealId));`,
    solution_code: `class StorageContract {
  constructor() {
    this.deals = [];
    this.nextId = 1;
  }

  createDeal(clientAddress, storageProvider, size, duration) {
    const deal = {
      id: this.nextId++,
      client: clientAddress,
      provider: storageProvider,
      size: size,
      duration: duration,
      createdAt: Date.now(),
      status: 'active'
    };

    this.deals.push(deal);
    return deal.id;
  }

  getDeal(dealId) {
    return this.deals.find(d => d.id === dealId) || null;
  }
}

const contract = new StorageContract();
const dealId = contract.createDeal('client1', 'provider1', 1024, 30);
console.log('Created deal:', dealId);
console.log('Deal info:', contract.getDeal(dealId));`,
    validation_tests: [
      {
        description: 'Should create a deal and return deal ID',
        test: "new StorageContract().createDeal('c1', 'p1', 100, 10) === 1"
      },
      {
        description: 'Should retrieve deal by ID',
        test: "(() => { const c = new StorageContract(); const id = c.createDeal('c1', 'p1', 100, 10); return c.getDeal(id).client === 'c1'; })()"
      },
      {
        description: 'Should return null for non-existent deal',
        test: "new StorageContract().getDeal(999) === null"
      }
    ],
    created_at: new Date().toISOString()
  }
];
