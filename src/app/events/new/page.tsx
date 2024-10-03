"use client"

// /events/new/index.tsx
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'

const NewEvent = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ eventName: '', eventDate: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Submit your form data to your API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });


        const event = await response.json();
        // Navigate to the new event page or back to the main events list
        router.push(`/events/1001`);

    };

    return (
        <form method="post" onSubmit={handleSubmit}>
            <Heading>New Event</Heading>
            <Divider className="my-10 mt-6" />
            <label>
                Event Name:
                <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                />
            </label>
            <label>
                Event Date:
                <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                />
            </label>

            <Divider className="my-10" soft />
            
            <div className="flex justify-end gap-4">
                <Button type="reset" plain>
                    Reset
                </Button>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    );
};

export default NewEvent;
