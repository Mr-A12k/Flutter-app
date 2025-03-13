import 'package:flutter/material.dart';

class ActivityScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Activity',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black), // Back button color
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Recent Activities',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView(
                children: [
                  _buildActivityItem(
                    title: 'Inspection Completed',
                    subtitle: 'You completed an inspection today at 2:00 PM',
                    icon: Icons.check_circle,
                    color: Colors.green,
                  ),
                  _buildActivityItem(
                    title: 'New Task Assigned',
                    subtitle: 'A new task has been assigned to you.',
                    icon: Icons.assignment,
                    color: Colors.blue,
                  ),
                  _buildActivityItem(
                    title: 'Photo Uploaded',
                    subtitle: 'You uploaded 3 images for the inspection report.',
                    icon: Icons.photo_camera,
                    color: Colors.orange,
                  ),
                  _buildActivityItem(
                    title: 'Review Submitted',
                    subtitle: 'Your feedback was submitted successfully.',
                    icon: Icons.rate_review,
                    color: Colors.purple,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem({required String title, required String subtitle, required IconData icon, required Color color}) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color.withOpacity(0.2),
          child: Icon(icon, color: color),
        ),
        title: Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
      ),
    );
  }
}
