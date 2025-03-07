
export interface CodeIssue {
  id: string;
  line: number;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  suggestion?: string;
  code?: string;
}

export interface CodeExample {
  id: string;
  name: string;
  language: string;
  code: string;
  issues: CodeIssue[];
}

export const codeExamples: CodeExample[] = [
  {
    id: 'example1',
    name: 'React Component',
    language: 'typescript',
    code: `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
        console.log(err);
      }
    };
    
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <img src={user.avatar} alt={user.name} />
      <p>{user.bio}</p>
      <div class="stats">
        <span>{user.followers} followers</span>
        <span>{user.following} following</span>
      </div>
    </div>
  );
};

export default UserProfile;`,
    issues: [
      {
        id: 'issue1',
        line: 13,
        type: 'warning',
        message: 'Missing dependency in useEffect',
        suggestion: 'Add userId to the dependency array to re-fetch when userId changes'
      },
      {
        id: 'issue2',
        line: 15,
        type: 'error',
        message: 'Using console.log in production code',
        suggestion: 'Remove console.log or replace with proper error logging'
      },
      {
        id: 'issue3',
        line: 22,
        type: 'warning',
        message: 'Missing null check before accessing user properties',
        suggestion: 'Add a check to ensure user is not null before accessing its properties'
      },
      {
        id: 'issue4',
        line: 24,
        type: 'error',
        message: 'Using class instead of className in JSX',
        suggestion: 'Replace class with className for React JSX',
        code: '<div className="stats">'
      }
    ]
  },
  {
    id: 'example2',
    name: 'Authentication Service',
    language: 'typescript',
    code: `import axios from 'axios';

const API_URL = 'https://api.example.com';
let token = localStorage.getItem('auth_token');

export const login = async (username, password) => {
  try {
    const response = await axios.post(\`\${API_URL}/login\`, {
      username,
      password
    });
    
    token = response.data.token;
    localStorage.setItem('auth_token', token);
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  token = null;
};

export const getUser = async () => {
  if (!token) return null;
  
  const response = await axios.get(\`\${API_URL}/user\`, {
    headers: {
      Authorization: \`Bearer \${token}\`
    }
  });
  
  return response.data;
};`,
    issues: [
      {
        id: 'issue5',
        line: 4,
        type: 'error',
        message: 'Storing token in global variable',
        suggestion: 'Use a more secure method for token storage'
      },
      {
        id: 'issue6',
        line: 28,
        type: 'error',
        message: 'Missing error handling in async function',
        suggestion: 'Add try/catch block to handle potential errors'
      },
      {
        id: 'issue7',
        line: 3,
        type: 'info',
        message: 'API URL hardcoded',
        suggestion: 'Consider using environment variables for API URLs'
      }
    ]
  }
];

export const getIssueCount = (issues: CodeIssue[]): Record<string, number> => {
  return issues.reduce((acc, issue) => {
    const { type } = issue;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getFilteredIssues = (
  issues: CodeIssue[],
  filters: { [key: string]: boolean }
): CodeIssue[] => {
  if (Object.values(filters).every(f => !f)) {
    return issues;
  }
  
  return issues.filter(issue => filters[issue.type]);
};
