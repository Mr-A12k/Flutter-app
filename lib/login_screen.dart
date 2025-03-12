// import 'package:flutter/material.dart';
// import 'signup_screen.dart';
// import 'home.dart';

// class LoginScreen extends StatefulWidget {
//   const LoginScreen({Key? key}) : super(key: key);

//   @override
//   _LoginScreenState createState() => _LoginScreenState();
// }

// class _LoginScreenState extends State<LoginScreen> {
//   bool _obscurePassword = true;
//   bool _agreeTerms = false; // Declare the checkbox state

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: const Color.fromARGB(255, 255, 255, 255),
//       body: Center(
//         child: Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 20),
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               const Text(
//                 "Log In",
//                 style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black),
//               ),
//               const SizedBox(height: 20),
//               TextField(
//                 decoration: InputDecoration(
//                   hintText: "Username",
//                   hintStyle: const TextStyle(color: Colors.grey),
//                   prefixIcon: const Icon(Icons.person, color: Color.fromARGB(255, 15, 15, 15)),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
//                 ),
//               ),
//               const SizedBox(height: 15),
//               TextField(
//                 obscureText: _obscurePassword,
//                 decoration: InputDecoration(
//                   hintText: "Password",
//                   hintStyle: const TextStyle(color: Colors.grey),
//                   prefixIcon: const Icon(Icons.lock, color: Color.fromARGB(255, 59, 59, 59)),
//                   suffixIcon: IconButton(
//                     icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility,
//                         color: const Color.fromARGB(130, 103, 103, 103)),
//                     onPressed: () {
//                       setState(() {
//                         _obscurePassword = !_obscurePassword;
//                       });
//                     },
//                   ),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
//                 ),
//               ),
//               const SizedBox(height: 15),

//               /// **Fixed Row with Checkbox**
//               Row(
//                 children: [
//                   Checkbox(
//                     value: _agreeTerms,
//                     onChanged: (value) {
//                       setState(() {
//                         _agreeTerms = value!;
//                       });
//                     },
//                   ),
//                   const Text("Remember Me", style: TextStyle(color: Colors.black)),
//                   const Spacer(), // Pushes "Forgot Password" to the right
//                   TextButton(
//                     onPressed: () {},
//                     child: const Text("Forgot Password?", style: TextStyle(color: Colors.black)),
//                   ),
//                 ],
//               ),
              
//               const SizedBox(height: 10),
//               ElevatedButton(
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: const Color.fromARGB(255, 26, 217, 26),
//                   padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
//                   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
//                 ),
//                 onPressed: () {
//                   // Navigate to HomeScreen when login button is pressed
//                   Navigator.pushReplacement(
//                       context, MaterialPageRoute(builder: (context) =>  EventScreen()));
//                 },
//                 child: const Text("Log In", style: TextStyle(fontSize: 18, color: Colors.black)),
//               ),
//               const SizedBox(height: 20),
//               const SizedBox(height: 10),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                   // IconButton(
//                   //     icon: const Icon(Icons.facebook, color: Colors.greenAccent), onPressed: () {}),
//                 ],
//               ),
//               const SizedBox(height: 20),
//               GestureDetector(
//                 onTap: () {
//                   Navigator.push(
//                       context, MaterialPageRoute(builder: (context) => const SignupScreen()));
//                 },
//                 child: const Text(
//                   "Don't have an account? Sign up",
//                   style: TextStyle(color: Colors.black),
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
import 'package:flutter/material.dart';
import 'home.dart';
import 'signup_screen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Login",
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black),
              ),
              const SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  hintText: "Email",
                  prefixIcon: const Icon(Icons.email, color: Colors.black),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  hintText: "Password",
                  prefixIcon: const Icon(Icons.lock, color: Colors.black),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                ),
                onPressed: () {
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const HomeScreen()));
                },
                child: const Text("Login", style: TextStyle(fontSize: 18, color: Colors.white)),
              ),
              const SizedBox(height: 20),
              GestureDetector(
                onTap: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const SignupScreen()));
                },
                child: const Text("Don't have an account? Sign Up", style: TextStyle(color: Colors.black)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
