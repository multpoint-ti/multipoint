import path from 'path';
import fs from 'fs/promises';
import { Event } from '@/shared/types/event-types';

const filePath = path.join(process.cwd(), 'src', 'data', 'events.json');

export const eventRepository = {
  async getAll(): Promise<Event[]> {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const events: Event[] = JSON.parse(fileContents);
      return events;
    } catch (error) {
      console.error('Error reading or parsing events data:', error);
      throw new Error('Failed to load events.');
    }
  },

  async getBySlug(slug: string): Promise<Event | null> {
    const events = await this.getAll();
    return events.find(e => e.slug === slug) || null;
  },
};