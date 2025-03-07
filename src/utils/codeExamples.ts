
export interface CodeIssue {
  id: string;
  line: number;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  suggestion?: string;
  code?: string;
  ticketId?: string;
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

export const createIssueTicket = (issue: CodeIssue, assignee: string): string => {
  // In a real app, this would call an API to create a ticket
  // For now, we'll just return a mock ticket ID
  const ticketId = `TICKET-${Math.floor(Math.random() * 1000)}`;
  issue.ticketId = ticketId;
  return ticketId;
};

export const mockTeamMembers = [
  { id: '1', name: 'Alex Chen', role: 'Frontend Developer', avatar: 'AC' },
  { id: '2', name: 'Maya Johnson', role: 'Backend Developer', avatar: 'MJ' },
  { id: '3', name: 'Taylor Smith', role: 'Full Stack Developer', avatar: 'TS' },
  { id: '4', name: 'Jamie Park', role: 'UI/UX Designer', avatar: 'JP' },
  { id: '5', name: 'Legal Team', role: 'Legal', avatar: 'LT' },
];

export interface PerformanceData {
  sprint: string;
  completed: number;
  planned: number;
  bugs: number;
  features: number;
  team: {
    memberId: string;
    tasks: number;
    completion: number;
  }[];
}

export const mockPerformanceData: PerformanceData[] = [
  {
    sprint: 'Sprint 1',
    completed: 23,
    planned: 30,
    bugs: 12,
    features: 18,
    team: [
      { memberId: '1', tasks: 8, completion: 75 },
      { memberId: '2', tasks: 10, completion: 90 },
      { memberId: '3', tasks: 7, completion: 85 },
      { memberId: '4', tasks: 5, completion: 100 },
    ]
  },
  {
    sprint: 'Sprint 2',
    completed: 28,
    planned: 25,
    bugs: 8,
    features: 17,
    team: [
      { memberId: '1', tasks: 7, completion: 100 },
      { memberId: '2', tasks: 8, completion: 88 },
      { memberId: '3', tasks: 6, completion: 100 },
      { memberId: '4', tasks: 4, completion: 100 },
    ]
  },
  {
    sprint: 'Sprint 3',
    completed: 32,
    planned: 35,
    bugs: 10,
    features: 25,
    team: [
      { memberId: '1', tasks: 10, completion: 80 },
      { memberId: '2', tasks: 12, completion: 92 },
      { memberId: '3', tasks: 8, completion: 100 },
      { memberId: '4', tasks: 5, completion: 100 },
    ]
  },
  {
    sprint: 'Current',
    completed: 18,
    planned: 40,
    bugs: 15,
    features: 25,
    team: [
      { memberId: '1', tasks: 12, completion: 50 },
      { memberId: '2', tasks: 15, completion: 40 },
      { memberId: '3', tasks: 8, completion: 38 },
      { memberId: '4', tasks: 5, completion: 60 },
    ]
  }
];

export const getMemberName = (id: string): string => {
  const member = mockTeamMembers.find(m => m.id === id);
  return member ? member.name : 'Unknown';
};
